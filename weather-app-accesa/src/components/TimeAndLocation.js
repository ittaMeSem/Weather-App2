import React from "react";
import { formatToLocalTime } from "../services/weatherAPI";
import { UilStar } from "@iconscout/react-unicons";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <p className="text-white text-xl font-extralight mb-3 sm:mb-0">
        {formatToLocalTime(dt, timezone)}
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white text-3xl font-medium mr-3">{`${name}, ${country}`}</p>
        <UilStar
          size={35}
          className="text-amber-300 cursor-pointer mt-3 sm:mt-0"
        />
      </div>
    </div>
  );
}

export default TimeAndLocation;
