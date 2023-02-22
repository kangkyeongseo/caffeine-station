import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <form>
        <input type="text" placeholder="ID" />
        <input type="password" placeholder="Password" />
        <input type="submit" placeholder="Login" />
      </form>
      <Link to="/join">Join</Link>
    </>
  );
};

export default Login;
