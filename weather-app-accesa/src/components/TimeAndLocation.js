import React from "react";
import { formatToLocalTime } from "../services/weatherAPI";
import { UilStar } from "@iconscout/react-unicons";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country} `}</p>
        <UilStar size={35} className="ml-5 text-amber-300 cursor-pointer" />
      </div>
    </div>
  );
}

export default TimeAndLocation;
