// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Maps from "./pages/Maps";
import Vehicles from "./pages/Vehicle/Vehicles";
import Plugins from "./pages/Plugins";
import Simulations from "./pages/Simulations";
import VehiclePage from "./pages/Vehicle/VehiclePage";
import SensorConfigurationPage from "./pages/Vehicle/SensorConfiguration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Maps />} />
      <Route path="maps" element={<Maps />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="vehicles/:cid" element={<VehiclePage />} />
      <Route path="vehicles/:cid/sensor-configuration/:sid" element={<SensorConfigurationPage />} />
      <Route path="plugins" element={<Plugins />} />
      <Route path="simulations" element={<Simulations />} />
    </Routes>
  </BrowserRouter>
);
