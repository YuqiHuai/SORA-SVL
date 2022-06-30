import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import { searchFilter } from "../utils/searchFilter";
import { Plugin } from "../utils/types";

function Plugins() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Plugin[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/v1/plugins`
      );
      const data = await res.json();
      setData(data.rows as Plugin[]);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full p-8 space-y-4">
        <div>
          <input
            className="bg-neutral-300 w-full p-2 rounded"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <Grid>
          {data
            .filter((value) => searchFilter(value, search))
            .map((value, index) => {
              return (
                <div
                  key={index}
                  className="relative p-2 bg-neutral-200 rounded"
                >
                  <span className="absolute top-5 left-5 text-white text-lg font-medium py-1">{`${value.owner.firstName} ${value.owner.lastName}`}</span>
                  <span
                    className={`absolute top-5 right-5 text-white text-lg font-medium px-2 py-1 rounded ${
                      value.category === "sensor"
                        ? "bg-blue-500"
                        : "bg-yellow-600"
                    }`}
                  >{`${value.category}`}</span>

                  <img
                    className="w-full rounded"
                    src={`${value.imageUrl}?type=small`}
                  />
                  <p className="text-lg font-semibold mt-2 truncate">
                    {value.name}
                  </p>
                  <p className="text-sm text-neutral-500 font-medium">
                    {value.id}
                  </p>
                </div>
              );
            })}
        </Grid>
      </div>
    </Layout>
  );
}

export default Plugins;
