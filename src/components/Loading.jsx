// import { useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div
      className="flex justify-center item-center h-screen"
      style={{
        backgroundImage: 'url("./images/Background.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative">
        <GridLoader color="gray" loading margin={20} size={29} width={100} />
      </div>
    </div>
  );
};

export default Loading;
