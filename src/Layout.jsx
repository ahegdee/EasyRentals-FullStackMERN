import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

const Layout = () => {
  return (
    <div className="py-4  px-8 flex flex-col min-h-screen">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
