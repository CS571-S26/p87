import React from "react";
import {BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom";

import Home from "./nav/pages/Home";
import Theater from "./nav/pages/Theater";
import SmashRouter from "./nav/SmashRouter";
import NavBar from "./nav/NavBar";

function App() {
  return <div>
    <NavBar />
    <Outlet></Outlet>
  </div>
}

export default App;