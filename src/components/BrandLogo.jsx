import React from "react";

const BrandLogo = ({ width = 45, height = 45, className = "" }) => {
  return (
    <img
      src="/chat.gif"
      alt="DevTinder Logo"
      width={width}
      height={height}
      className={className}
      loading="lazy"
      style={{
        objectFit: "contain",
        display: "block",
      }}
    />
  );
};

export default BrandLogo;
