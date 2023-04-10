import React from "react";

//Component that generates a series of buttons that allow the user to quickly select a city to fetch weather data for, and updates the query based on the selected city
function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Bucharest",
    },
    {
      id: 2,
      title: "London",
    },
    {
      id: 3,
      title: "Bali",
    },
    {
      id: 4,
      title: "Tokyo",
    },
    {
      id: 5,
      title: "Sydney",
    },
  ];

  return (
    <div className="flex justify-center items-center my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-base font-medium my-2 mx-3 transition duration-300 md:text-xl md:font-lg"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
          <span className="w-full h-0.5 bg-white max-w-0 group-hover:max-w-full transition-all duration-500"></span>
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
