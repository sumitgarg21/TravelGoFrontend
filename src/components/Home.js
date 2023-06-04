import React from "react";
import { Crousel } from "./Crousel";
import { Travelnav } from "./Travelnav";
import { Outlet } from "react-router-dom";
import { Reviews } from "./Reviews";
export const Home = () => {
  return (
    <div >
      <Crousel />
      <div style={{ marginTop: "100px" }}>
        <Travelnav />
      </div>
      <Outlet />
      <Reviews />
    </div>
  );
};
