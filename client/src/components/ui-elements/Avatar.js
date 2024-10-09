import React from "react";
import { PiUserCircleFill } from "react-icons/pi";

const Avatar = ({ src, alt, className }) => {
  const isUndefinedSrc = !src || src.includes("undefined") || src === null;

  return (
    <div>
      {isUndefinedSrc ? (
        <PiUserCircleFill className={className} />
      ) : (
        <img
          src={src}
          alt={alt || "User Avatar"}
          className={`${className} object-cover border-4 border-gray-300`}
        />
      )}
    </div>
  );
};

export default Avatar;
