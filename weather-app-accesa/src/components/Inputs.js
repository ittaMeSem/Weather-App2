import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
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
    setQuery({ q: city });
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
    <div className="flex flex-col items-center justify-center my-6 mx-2 md:m-auto">
      <div className="flex flex-row md:w-auto">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search"
          className="text-xl font-light p-2 shadow-xl shadow:black focus:outline-none capitalize placeholder:lowercase rounded-xl"
        />
        <div className="flex flex-row items-center ml-3">
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125 mr-2 sm:mr-0"
            onClick={handleUnitsChange}
          >
            {" "}
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125 ml-2 sm:ml-0"
            onClick={handleUnitsChange}
          >
            {" "}
            °F
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-row p-5">
        <UilSearch
          size={30}
          className="text-white cursor-pointer mr-10 transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={30}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
    </div>
  );
}

export default Inputs;
