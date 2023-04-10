import React, { useState, useEffect } from "react";
// import TimeAndLocation from "./TimeAndLocation";

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [favorites]);

  return (
    <div>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorites, index) => (
            <li
              key={index}
              className="text-white cursor-pointer"
            >{`${favorites.name}, ${favorites.country}`}</li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No favorites added.</p>
      )}
    </div>
  );
}

export default Favorite;
