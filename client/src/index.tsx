import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maps from "./pages/Maps";
import Vehicles from "./pages/Vehicle/Vehicles";
import Plugins from "./pages/Plugins";
import Simulations from "./pages/Simulations";
import VehiclePage from "./pages/Vehicle/VehiclePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Maps />} />
      <Route path="maps" element={<Maps />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="vehicles/*" element={<VehiclePage />} />
      <Route path="plugins" element={<Plugins />} />
      <Route path="simulations" element={<Simulations />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
