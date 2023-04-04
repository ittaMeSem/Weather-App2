import React from "react";

function TimeAndLocation() {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          Tuesday, April 4th 2023 | Local time: 5:39 PM
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">Cluj-Napoca, RO</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
