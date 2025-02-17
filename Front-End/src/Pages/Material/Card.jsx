// src/components/MaterialCard.js
import React from "react";

const MaterialCard = ({ material }) => {
  return (
    <div
      key={material.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => {
        window.location.href = `/material-details/${material.id}`;
      }}
    >
      <div className="h-40 bg-[#DAE3EB] rounded-t-lg overflow-hidden">
        <img
          src={material.image_url}
          alt={material.name_en}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#181d27] font-semibold">{material.name_en}</h3>
            <p className="text-[#7B7979] text-sm">{material.name_ar}</p>
          </div>
          <span className="bg-[#46B1C1] text-white px-2 py-1 rounded text-sm">
            {material.barcode}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => {
              window.location.href = `/material-details/${material.id}`;
            }}
            className="w-full bg-[#2960EC] text-white py-2 px-4 rounded-lg hover:bg-[#17398EEE] transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
