// SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
// SPDX-License-Identifier: BSD-3-Clause
// Modifications Copyright (c) 2025 Xronos Inc.

import React from "react";
import { Link, useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const getClassNames = (path: string) => {
    const pathName = location.pathname === "/" ? "/maps" : location.pathname;
    return path === pathName
      ? "w-full bg-neutral-800 p-4 text-white"
      : "w-full bg-neutral-300 p-4 text-black hover:bg-neutral-400";
  };
  return (
    <div className="h-screen w-screen flex flex-row fixed top-0 left-0">
      <nav className="h-screen w-64 bg-neutral-300 flex flex-col">
        <Link to="/maps">
          <div className={getClassNames("/maps")}>Maps</div>
        </Link>
        <Link to="/vehicles">
          <div className={getClassNames("/vehicles")}>Vehicles</div>
        </Link>
        <Link to="/plugins">
          <div className={getClassNames("/plugins")}>Plugins</div>
        </Link>
        <Link to="/simulations">
          <div className={getClassNames("/simulations")}>Simulations</div>
        </Link>
      </nav>
      <div className="h-screen flex-1 overflow-scroll">{children}</div>
    </div>
  );
};

export default Layout;
