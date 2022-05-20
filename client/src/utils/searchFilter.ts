import React from "react";
import { Map, Plugin, Vehicle } from "./types";

export function searchFilter(value: Map | Plugin | Vehicle, query: string) {
  return (
    value.id.toLowerCase().includes(query.toLowerCase()) ||
    value.name.toLowerCase().includes(query.toLowerCase()) ||
    `${value.owner.firstName} ${value.owner.lastName}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
