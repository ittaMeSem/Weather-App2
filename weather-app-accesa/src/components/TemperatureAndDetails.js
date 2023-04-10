import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilTemperatureMinus,
  UilTemperaturePlus,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconURLFromCode } from "../services/weatherAPI";

//Component containing various weather-related information such as humidity, wind speed, etc.
function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  //The component renders all this information in a visually appealing manner using HTML elements and CSS styles.
  //It also uses utility functions to format elements such as temperature, sunrise and sunset times according to the user's timezone
  return (
    <div>
      <div className="flex items-center justify-center py-3 text-xl md:text-2xl text-white ">
        <p>{details}</p>
      </div>
      <div className="flex flex-row md:flex-col items-center justify-center text-white py-3">
        <img src={iconURLFromCode(icon)} alt="weather" className="w-20" />
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
          <p className="text-5xl">{`${temp.toFixed()}°`}</p>
          <div className="flex flex-col md:items-center md:ml-4">
            <div className="flex font-light text-sm items-center justify-center md:mr-4">
              <UilTemperature size={18} className="mr-1" />
              Real feel:
              <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center md:mr-4">
              <UilTear size={18} className="mr-1" />
              Humidity:
              <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
            </div>
            <div className="flex font-light text-sm items-center justify-center">
              <UilWind size={18} className="mr-1" />
              Wind:
              <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-10 flex-wrap items-center justify-center space-x-1 text-white text-lg py-3">
        <div className="flex flex-row">
          <UilSun />
          <p className="font-light">
            Sunrise:{" "}
            <span className="font-medium ml-1">
              {formatToLocalTime(sunrise, timezone, "hh:mm a")}
            </span>
          </p>
        </div>
        <div className="flex flex-row">
          <UilSunset />
          <p className="font-light">
            Sunset:{" "}
            <span className="font-medium ml-1">
              {formatToLocalTime(sunset, timezone, "hh:mm a")}
            </span>
          </p>
        </div>
        <div className="flex flex-row">
          <UilTemperaturePlus />
          <p className="font-light">
            High:{" "}
            <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
          </p>
        </div>
        <div className="flex flex-row">
          <UilTemperatureMinus />
          <p className="font-light">
            Low:{" "}
            <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
