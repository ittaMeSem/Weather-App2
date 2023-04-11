import { DateTime } from "luxon";

//API key and url
const API_KEY = "f89c61f63cb80999c3446319f81cd246";
const API_URL = "https://api.openweathermap.org/data/2.5";

//Function that constructs a URL to call the API, makes a GET request to the constructed URL and returns a promise that resolves with a JSON response from the  API
const fetchWeatherData = (infoType, searchParams) => {
  const url = new URL(API_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

//Extracts specific data from the API, formats them and returns an object that contains the formatted data
const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

//Similar to the previous function, however, this function extracts daily, for the following days, and hourly data from the API
const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

//The main function that fetches data from the API, formats it using the above functions and returns an object that contains formatted current and forecast weather data
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await fetchWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await fetchWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

//Function that takes in a UNIX timestamp, a timezone, and an optional format string, and uses the Luxon library to format the timestamps as a localized date/time string in the specified timezone
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//Takes icon codes and returns the URL of the corresponding weather icon image from the API
const iconURLFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconURLFromCode };
