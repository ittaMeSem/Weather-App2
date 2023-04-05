import React, { useState } from "react";
import { UilSearch, UilLocationPoint, UilStar } from "@iconscout/react-unicons";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info(`Fetching user's location`);
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <UilStar
          size={50}
          className="text-white fill-yellow-300 stroke-yellow-300 cursor-pointer"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-xl"
        />
        <UilSearch
          size={50}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={50}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          {" "}
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          {" "}
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
