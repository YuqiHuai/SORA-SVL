// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

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
