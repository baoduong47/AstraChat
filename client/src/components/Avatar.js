import React from "react";
import { PiUserCircleFill } from "react-icons/pi";

const Avatar = ({ src, alt, className }) => {
  const isUndefinedSrc = !src || src === "http://localhost:3000/undefined";

  return (
    <div>
      {isUndefinedSrc ? (
        <PiUserCircleFill className={className} />
      ) : (
        <img src={src} alt={alt} className={`${className} object-cover`} />
      )}
    </div>
  );
};

export default Avatar;
