// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, imageUrl, description, link, isComingSoon }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer relative ${
        isComingSoon ? "backdrop-blur-sm" : "" // Apply blur effect to card background
      }`}
    >
      <Link to={link}>
        {/* Make sure the image is clear and does not get the blur effect */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4" // No blur effect on the image
        />
        <h3
          className={`text-xl font-semibold text-heading mb-2 ${
            isComingSoon ? "blur-sm" : "" // Apply blur effect to title text if needed
          }`}
        >
          {title}
        </h3>
        <p className={`text-gray-600 ${isComingSoon ? "blur-sm" : ""}`}>
          {description}
        </p>
      </Link>
    </div>
  );
};

export default Card;
