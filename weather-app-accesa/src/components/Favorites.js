import React, { useState, useEffect } from "react";
import { UilX } from "@iconscout/react-unicons";

function Favorite({ setQuery }) {
  const [favorites, setFavorites] = useState([]);

  //Hook that fetches the items saved in local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  //Function linked with a button that removes locations visually and from local storage
  const removeFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  //The rendered favorite section
  return (
    <div className="flex items-center justify-center">
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorites, index) => (
            <li
              key={index}
              className="text-white cursor-pointer text-lg"
              onClick={() => setQuery({ q: favorites.name })}
            >
              {`${favorites.name}, ${favorites.country}`}
            </li>
          ))}
          <button>
            <UilX onClick={removeFavorite} className="text-red-600 text-lg" />
          </button>
        </ul>
      ) : (
        <p className="text-white">No favorites added.</p>
      )}
    </div>
  );
}

export default Favorite;
