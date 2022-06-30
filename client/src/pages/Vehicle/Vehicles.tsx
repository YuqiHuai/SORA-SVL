import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "../../components/Grid";
import Layout from "../../components/Layout";
import { searchFilter } from "../../utils/searchFilter";
import { Vehicle } from "../../utils/types";

function Vehicles() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/v1/vehicles`
      );
      const data = await res.json();
      setData(data.rows as Vehicle[]);
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
                <Link to={`/vehicles/${value.id}`} key={index}>
                  <div
                    key={index}
                    className="relative p-2 bg-neutral-200 rounded"
                  >
                    <span className="absolute top-5 left-5 text-white text-lg font-medium">{`${value.owner.firstName} ${value.owner.lastName}`}</span>
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
                </Link>
              );
            })}
        </Grid>
      </div>
    </Layout>
  );
}

export default Vehicles;
