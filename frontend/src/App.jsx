// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Visuals from "./pages/Visuals";
import Cultural from "./pages/Cultural";
import Meeting from "./pages/Meeting";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visuals" element={<Visuals />} />
          <Route path="/cultural" element={<Cultural />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
