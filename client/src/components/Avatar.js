import React from "react";

const Avatar = ({ src, alt, className }) => {
  return (
    <div>
      <div className="border-2 border-slate-600 rounded-full">
        <img src={src} alt={alt} className={`${className}`} />
      </div>
    </div>
  );
};

export default Avatar;
