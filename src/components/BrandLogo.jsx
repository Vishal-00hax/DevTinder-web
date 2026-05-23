import React from 'react';

const BrandLogo = ({ className = "" }) => {
  return (
    <a className={`btn btn-ghost normal-case text-2xl font-bold text-primary tracking-tight ${className}`}>
      <span className="text-base-content">&lt;</span>
      <span>DevTinder</span>
      <span className="text-base-content">/&gt;</span>
    </a>
  );
};

export default BrandLogo;
