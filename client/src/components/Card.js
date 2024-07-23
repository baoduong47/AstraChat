import React from "react";
import Avatar from "./Avatar";

const Card = ({ avatar, author, date, title, description }) => {
  return (
    <div className="max-w-sm w-full flex border border-gray-400 bg-white rounded p-4 shadow-lg">
      <div className="flex-shrink-0 mr-6">
        <Avatar
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-14 h-14 rounded-full"
        />
        <p className="text-gray-900 font-light text-lg">{author}</p>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray-900 font-bold text-xl mb-2">{title}</p>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <p className="text-gray-600 text-xs mt-2">{date}</p>
      </div>
    </div>
  );
};

export default Card;
