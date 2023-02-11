import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafeDatail from "routes/CafeDetail";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Search from "routes/Search";
import { Location } from "./App";
import Nav from "./Nav";

interface Prop {
  location: Location;
}

const AppRouter = ({ location }: Prop) => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home location={location} />} />
        <Route path="/search" element={<Search location={location} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cafe/:id" element={<CafeDatail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
