import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Layout from "../components/Layout";

type Map = {
  id: string;
  name: string;
  imageUrl: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

function Maps() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Map[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/v1/maps");
      const data = await res.json();
      setData(data.rows as Map[]);
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
          />
        </div>
        <Grid>
          {data.map((value, index) => {
            return (
              <div key={index} className="relative p-2 bg-neutral-200 rounded">
                <span className="absolute top-5 left-5 text-white text-lg font-medium">{`${value.owner.firstName} ${value.owner.lastName}`}</span>
                <img
                  className="w-full rounded"
                  src={`http://localhost:3000${value.imageUrl}?type=small`}
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

export default Maps;
