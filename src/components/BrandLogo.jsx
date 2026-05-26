import React from 'react';

const BrandLogo = ({ className = "" }) => {
  return (
    <div className={`btn btn-ghost normal-case text-2xl font-bold text-primary tracking-tight ${className}`}>
      <span className="text-base-content">&lt;</span>
      <span>DevTinder</span>
      <span className="text-base-content">/&gt;</span>
    </div>
  );
};

export default BrandLogo;
