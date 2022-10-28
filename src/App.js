import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import "./index.css";

const Home = lazy(() => import("./components/Home"));
const Chess = lazy(() => import("./components/Chess"));

const App = () => {

  const [difficulty, setDifficulty] = useState(2)

  return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home setDifficulty={setDifficulty} />} />
            <Route path="/game" element={<Chess difficulty={difficulty} />} />
          </Routes>
        </Suspense>
      </Router>
  );
};

export default App;
