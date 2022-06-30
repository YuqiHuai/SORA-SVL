import React from "react";
import Layout from "../components/Layout";

function Simulations() {
  const onStopSimulation = () => {
    fetch(`/api/v1/clusters/stop`);
  };
  const onDisconnectSimulator = () => {
    fetch(`/api/v1/clusters/disconnect`);
  };
  const onStartSimulation = () => {
    fetch(`/api/v1/clusters/start/apiOnly`);
  };

  return (
    <Layout>
      <div className="w-full h-full p-8 space-y-4 space-x-4">
        <a
          className="bg-blue-500 hover:bg-blue-800 cursor-pointer px-4 py-2 text-white rounded"
          onClick={onStartSimulation}
        >
          API Only
        </a>
        <a
          className="bg-blue-500 hover:bg-blue-800 cursor-pointer px-4 py-2 text-white rounded"
          onClick={onStopSimulation}
        >
          Stop Simulation
        </a>
        <a
          className="bg-blue-500 hover:bg-blue-800 cursor-pointer px-4 py-2 text-white rounded"
          onClick={onDisconnectSimulator}
        >
          Disconnect
        </a>
      </div>
    </Layout>
  );
}

export default Simulations;
