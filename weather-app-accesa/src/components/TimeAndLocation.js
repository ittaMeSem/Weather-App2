import React, { useState } from "react";
import { formatToLocalTime } from "../services/weatherAPI";
import { UilStar } from "@iconscout/react-unicons";

//Component that renders the specified location by the user and the corresponding local time and current weather
function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleAddToFavorite = () => {
    const newFavorite = { name, country };
    setFavorites([...favorites, newFavorite]);
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, newFavorite])
    );
  };

  const isFavorited = () => {
    return favorites.some(
      (favorite) => favorite.name === name && favorite.country === country
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <p className="text-white text-xl font-extralight mb-3">
        {formatToLocalTime(dt, timezone)}
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white text-3xl font-medium mr-3">{`${name}, ${country}`}</p>
        <UilStar
          size={35}
          className={`cursor-pointer mt-3 ${
            isFavorited() ? "text-amber-300 " : "text-white"
          }`}
          onClick={handleAddToFavorite}
        />
      </div>
    </div>
  );
}

export default TimeAndLocation;
