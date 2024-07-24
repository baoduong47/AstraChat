import React from "react";
import Avatar from "./Avatar";

const Card = ({ avatar, author, date, title, description }) => {
  return (
    <div className="max-w-full w-full flex  bg-cardColor rounded p-4 shadow-xl">
      <div className="flex-shrink-0 mr-6">
        <Avatar
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-20 h-20 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray-950 font-Bold text-xl">{author}</p>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <p className="text-gray-600 text-xs mt-2">{date}</p>
      </div>
    </div>
  );
};

export default Card;
