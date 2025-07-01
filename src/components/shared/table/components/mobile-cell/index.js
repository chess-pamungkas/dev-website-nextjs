import React from "react";

export const MobileCell = (min, avg) => {
  return (
    <div className="mobile-cell">
      <p className="mobile-cell__title">Min</p>
      <p className="mobile-cell__value">{min}</p>
      <p className="mobile-cell__title">Avg</p>
      <p className="mobile-cell__value">{avg}</p>
    </div>
  );
};
