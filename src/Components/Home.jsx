import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('./images/Background/peakpx2.jpg')",
      }}
    >
      <button
        onClick={() => navigate("/game")}
        className="relative top-[25%] hover:scale-105 duration-500"
      >
        <img src={"./images/2-02.png"} alt="tag" />
        <p className="z-10 relative bottom-[5.6rem] font-black text-[30px]">
          New Game
        </p>
      </button>
    </div>
  );
};

export default Home;
