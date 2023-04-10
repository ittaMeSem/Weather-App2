import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherAPI";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Main App function w/ hooks
function App() {
  const [query, setQuery] = useState({ q: "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  //Fetch weather data, display annotations using toast library, update the component's state, calls fetchWeather whenever values change
  useEffect(() => {
    const fetchWeather = async () => {
      let params = { ...query, units };
      if (!query.q && location) {
        params.lat = location.latitude;
        params.lon = location.longitude;
      }

      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData(params).then((data) => {
        toast.success(
          `Successfully fetched data for ${data.name}, ${data.country}`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units, location]);

  //A function that changes the background depending on the location's temperature using a threshold
  const formatBackground = () => {
    if (!weather) return "bg-gradient-to-b from-cyan-600 to-blue-400";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold)
      return "bg-gradient-to-b from-cyan-600 to-blue-400";

    return "bg-gradient-to-b from-yellow-600 to-orange-600";
  };

  //Gets the user's current location to be displayed on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //Rendered app
  return (
    <div
      className={`mx-auto max-w-screen py-5 md:px-32 bg-gradient-to-b from-cyan-500 to-blue-600 drop-shadow-xl shadow-gray-600 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
