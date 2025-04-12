// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Visuals from "./pages/Visuals";
import Cultural from "./pages/Cultural";
import Meeting from "./pages/Meeting";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Project</h1>
        <div className="card-container">
          <div
            className="card"
            onClick={() => (window.location.href = "/visuals")}
          >
            <h2>Visuals</h2>
            <p>Handwritten letters, poems, live concerts</p>
          </div>
          <div
            className="card"
            onClick={() => (window.location.href = "/cultural")}
          >
            <h2>Cultural</h2>
            <p>Images, cultural events, videos</p>
          </div>
          <div
            className="card"
            onClick={() => (window.location.href = "/meeting")}
          >
            <h2>Meeting</h2>
            <p>Depression, anxiety, etc.</p>
          </div>
        </div>
        <Routes>
          <Route path="/visuals" component={Visuals} />
          <Route path="/cultural" component={Cultural} />
          <Route path="/meeting" component={Meeting} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
