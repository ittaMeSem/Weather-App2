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
import BurgerMenu from "react-burger-menu";

function App() {
  const [query, setQuery] = useState({ q: "cluj-napoca" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched data for ${data.name}, ${data.country}`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-400";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-400";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className="bg-gradient-to-b from-cyan-600 to-blue-400 p-5">
      <div
        className={`rounded-xl mx-auto max-w-screen-md py-5 px-32 bg-gradient-to-b from-cyan-500 to-blue-600 h-fit drop-shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        {/* <Favorites
          favorites={favorites}
          setFavorites={setFavorites}
          query={query}
        /> */}
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
    </div>
  );
}

export default App;
