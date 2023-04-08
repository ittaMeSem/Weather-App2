import { useState } from "react";


function Favorite({ location, onRemove }) {
  const [isFavorite, setIsFavorite] = useState(true);

  const handleRemove = () => {
    setIsFavorite(false);
  };
  onRemove(location);

  return (
    <>
      {isFavorite && (
        <div className="flex items-center justify-center py-2 px-4 bg-gray-100 rounded-md my-2">
          <p>{location}</p>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            Remove
          </button>
        </div>
      )}
    </>
  );
}

export default Favorite;
