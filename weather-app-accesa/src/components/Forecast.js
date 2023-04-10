import React from "react";
import { iconURLFromCode } from "../services/weatherAPI";

//Functional component that renders the container in which the hourly and daily weather forecast is displayed
function Forecast({ title, items }) {
  return (
    <div className="flex flex-col items-center pb-5">
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="grid grid-cols-5 gap-3 md:gap-8 items-center justify-center text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gradient-to-b p-2 rounded-lg shadow-inner shadow-gray-700"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconURLFromCode(item.icon)}
              alt="weather"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
