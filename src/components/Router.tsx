import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafeDatail from "routes/CafeDetail";
import Home from "routes/Home";
import Login from "routes/Login";
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
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cafe/:id" element={<CafeDatail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
