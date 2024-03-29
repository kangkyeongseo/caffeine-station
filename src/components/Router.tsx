import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafeDatail from "routes/CafeDetail";
import ChangePassword from "routes/ChangePassword";
import Home from "routes/Home";
import Join from "routes/Join";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Search from "routes/Search";
import Header from "./Header";
import Nav from "./Nav";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/cafe/:id" element={<CafeDatail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
