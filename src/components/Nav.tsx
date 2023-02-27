import { sessionState } from "Atom";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

const Nav = () => {
  const [session, setSession] = useRecoilState(sessionState);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          {session.loggedIn ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
