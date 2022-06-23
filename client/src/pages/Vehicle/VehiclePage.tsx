import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { Vehicle } from "../../utils/types";

function VehiclePage() {
  const location = useLocation();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [newConfig, setNewConfig] = useState("");
  const [bridge, setBridge] = useState("ROS");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1${location.pathname}`
      );
      const data = await res.json();
      setVehicle(data as Vehicle);
    };
    fetchData();
  }, []);

  const validateJSON = (jstring: string) => {
    try {
      JSON.parse(jstring);
      return true;
    } catch {
      return false;
    }
  };

  const onAddNewConfig = () => {
    if (newConfig === "") {
      alert("Empty Config!");
    } else if (!validateJSON(newConfig)) {
      alert("Invalid JSON");
    } else {
      const obj = {
        id: vehicle.id,
        assetGuid: vehicle.assetGuid,
        name: vehicle.name,
        sensors: JSON.parse(newConfig),
        bridge: bridge,
      };
      console.log(obj);
      setShowOverlay(false);
    }
  };

  return (
    <Layout>
      {/* ACTUAL CONTENT */}
      {vehicle && (
        <div className="w-full h-full p-8 space-y-4 z-10">
          <div>
            <h1 className="text-4xl font-bold">{vehicle.name}</h1>

            <p className="text-xl">
              Provided by:{" "}
              {`${vehicle.owner.firstName} ${vehicle.owner.lastName}`}
            </p>
            <p className="text-xl">Description: {vehicle.description}</p>
          </div>
          <div>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}${vehicle.imageUrl}`}
            />
          </div>
          <div>
            <p className="font-bold py-2">
              Sensor Configurations ({vehicle.sensorsConfigurations!.length}){" "}
            </p>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <th className="py-3">Name</th>
                  <th className="py-3">Owner</th>
                  <th className="py-3">ID</th>
                </tr>
              </thead>
              <tbody className="text-lg text-gray-800">
                {vehicle.sensorsConfigurations
                  .sort((a, b) =>
                    a.owner.firstName > b.owner.firstName
                      ? -1
                      : a.owner.lastName > b.owner.lastName
                      ? -1
                      : a.id > b.id
                      ? -1
                      : 1
                  )
                  .map((value, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="py-4">{value.name}</td>
                        <td>
                          {value.owner.firstName + " " + value.owner.lastName}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(value.id)
                          }
                        >
                          <span className="border-2 p-1 mr-2 rounded-md">
                            ID
                          </span>
                          {value.id}
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

export default VehiclePage;
