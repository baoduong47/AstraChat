import React from "react";

const Avatar = ({ src, alt, className }) => {
  return (
    <div>
      <img src={src} alt={alt} className={`${className}`} />
    </div>
  );
};

export default Avatar;
