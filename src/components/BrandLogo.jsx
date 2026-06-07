import React from "react";

const BrandLogo = ({ width = 45, height = 45, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#8A2BE2" />
        </linearGradient>
        <linearGradient id="ringGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF007A" />
          <stop offset="100%" stopColor="#4A00E0" />
        </linearGradient>
      </defs>

      {/* Clean Dark Background Circle with Gradient Stroke */}
      <circle cx="250" cy="250" r="230" fill="#0F111A" />
      <circle
        cx="250"
        cy="250"
        r="230"
        stroke="url(#ringGradient)"
        strokeWidth="6"
      />

      {/* Left Code Bracket */}
      <path
        d="M 160 170 L 90 230 L 160 290"
        stroke="url(#brandGradient)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Code Bracket */}
      <path
        d="M 340 170 L 410 230 L 340 290"
        stroke="url(#brandGradient)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Linked Heart Graphic */}
      <path
        d="M 250 300 C 250 300 160 230 160 180 C 160 140 200 120 225 140 L 250 160 L 275 140 C 300 120 340 140 340 180 C 340 230 250 300 250 300 Z"
        fill="none"
        stroke="url(#brandGradient)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* DevLink Wordmark */}
      <text
        x="250"
        y="390"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="52"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="1"
      >
        Dev<tspan fill="#00F0FF">Link</tspan>
      </text>

      {/* Subtitle */}
      <text
        x="250"
        y="425"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="15"
        fontWeight="600"
        fill="#8892B0"
        textAnchor="middle"
        letterSpacing="4"
      >
        DEVELOPER NETWORK
      </text>
    </svg>
  );
};

export default BrandLogo;
