import React from "react";
import { PiUserCircleFill } from "react-icons/pi";

const Avatar = ({ src, alt, className }) => {
  const isUndefinedSrc =
    !src ||
    src === `https://my-messaging-app-strf.onrender.com/uploads/undefined`;

  return (
    <div>
      {isUndefinedSrc ? (
        <PiUserCircleFill className={className} />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} object-cover border-4 border-gray-300`}
        />
      )}
    </div>
  );
};

export default Avatar;
