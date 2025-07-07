import React from "react";
const loader = "/images/bg/loader.svg";
const Loader = () => {
  return (
    <div className="global-loader">
      <img
        src={typeof loader === "string" ? loader : loader.src}
        alt=""
        className="global-loader__img"
      />
    </div>
  );
};

export default Loader;
