// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { SensorConfiguration, Vehicle } from "../../utils/types";

function SensorConfigurationPage() {
  const location = useLocation();
  const [sensorConfiguration, setSensorConfiguration] = useState<SensorConfiguration | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(location.pathname);
      const vehiclePath = location.pathname.split('/').slice(0, 3).join('/');
      const sid = location.pathname.split('/').slice(-1)[0];
      console.log(vehiclePath, sid);
      const res = await fetch(
        `/api/v1/${vehiclePath}`
      );
      const data = await res.json();
      const sensorConfiguration = (data as Vehicle).sensorsConfigurations.find(conf => conf.id === sid);
      setSensorConfiguration(sensorConfiguration as SensorConfiguration);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* ACTUAL CONTENT */}
      {sensorConfiguration && (
        <div className="w-full h-full p-8 space-y-4 z-10">
          <div>
            <h1 className="text-4xl font-bold">{sensorConfiguration.name}</h1>

            <p className="text-xl">
              Provided by:{" "}
              {`${sensorConfiguration.owner.firstName} ${sensorConfiguration.owner.lastName}`}
            </p>
          </div>
          <div>
            <p className="font-bold py-2">
              Sensors ({sensorConfiguration.sensors.length}){" "}
            </p>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <th className="py-3">Type</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">ID</th>
                </tr>
              </thead>
              <tbody className="text-lg text-gray-400">
                {sensorConfiguration.sensors
                  .map((sensor, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="py-4">
                          {sensor.type}
                        </td>
                        <td>
                          {sensor.name}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(sensor.pluginId)
                          }
                        >
                          <span className="border-2 p-1 mr-2 rounded-md">
                            ID
                          </span>
                          {sensor.pluginId}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SensorConfigurationPage;

