import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Search from "routes/Search";
import Nav from "./Nav";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
