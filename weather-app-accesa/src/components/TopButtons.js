import React from "react";

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
      title: "New York",
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
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium transition duration-300"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
          <span className=" max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5"></span>
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
