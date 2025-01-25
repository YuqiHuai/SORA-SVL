// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import React from "react";
type GridProps = {
  children: React.ReactNode;
};
const Grid: React.FC<GridProps> = ({ children }) => {
  return <div className="grid gap-4 grid-cols-3 pb-4">{children}</div>;
};

export default Grid;
