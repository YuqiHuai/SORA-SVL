// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { SimulatorStatusMap } from "../utils/types";

function Simulations() {
  const onStopSimulation = (simulatorId: string) => {
    fetch(`/api/v1/clusters/stop/${simulatorId}`);
  };
  const onDisconnectSimulator = (simulatorId: string) => {
    fetch(`/api/v1/clusters/disconnect/${simulatorId}`);
  };
  const onStartSimulation = (simulatorId: string) => {
    fetch(`/api/v1/clusters/start/apiOnly/${simulatorId}`);
  };

  const [simulatorStatus, setSimulatorStatus] = useState<SimulatorStatusMap>({});

  useEffect(() => {
    const fetchSimulatorStatus = async () => {
      const res = await fetch(
        `/api/v1/clusters/simulatorStatus`
      );
      const simulatorStatus = await res.json();
      setSimulatorStatus(simulatorStatus as SimulatorStatusMap);
    };

    fetchSimulatorStatus();
    const updateSimulatorStatus = setInterval(() => {
      fetchSimulatorStatus();
    }, 500);

    return () => { clearInterval(updateSimulatorStatus) };
  }, []);

  return (
    <Layout>
      {Object.keys(simulatorStatus).map(simulatorId => {
        const { alive, running } = simulatorStatus[simulatorId];
        return (
          <div className="w-full p-8 space-y-4 space-x-4">
            <div className="grid gap-4 grid-cols-4 pv-4 text-center">
            <span className="col-span-2 align-middle font-bold text-lg">
              {simulatorId}
            </span>
            <span className={`${alive ? "bg-green-400" : "bg-red-400"} font-bold text-white`}>
              {alive ? "Online" : "Offline"}
            </span>
            <span className={`${running ? "bg-green-400" : "bg-red-400"} font-bold text-white`}>
              {running ? "Running" : "Stopped"}
            </span>
            <a
              className="col-span-2 bg-blue-500 hover:bg-blue-800 cursor-pointer px-4 py-2 text-white rounded"
              onClick={() => running ? onStopSimulation(simulatorId) : onStartSimulation(simulatorId)}
            >
              {simulatorStatus[simulatorId].running ? "Stop Simulation" : "API Only"}
            </a>
            <a
              className="col-span-2 bg-blue-500 hover:bg-blue-800 cursor-pointer px-4 py-2 text-white rounded"
              onClick={() => onDisconnectSimulator(simulatorId)}
            >
              Disconnect
            </a>
            </div>
          </div>
        );
      })}
    </Layout>
  );
}

export default Simulations;
