import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chess from "./Components/Chess";
import Home from "./Components/Home";
import "./index.css";

const Main = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Chess />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
