import { Link, useLocation } from "react-router-dom";
import { sessionState } from "Atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useState } from "react";

const Navigation = styled.nav`
  z-index: 10;
  max-width: 480px;
  margin: 0 auto;
  color: #ffffff;
  font-size: 16px;
  border-end-end-radius: 100px;
`;

const Lists = styled.ul`
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  li:last-child {
    border-end-end-radius: 100px;
  }
`;

const List = styled.li<{ selected: string }>`
  width: 100%;
  background-color: #246653;
  color: ${(props) => props.selected};
  transform: translateY(0px);
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  &:hover {
    background-color: #144235;
  }
`;

const Nav = () => {
  const session = useRecoilValue(sessionState);
  const location = useLocation();
  const [nav, setNav] = useState(location.pathname);

  console.log(location);

  const onClick = (nav: string) => {
    setNav(nav);
  };

  return (
    <Navigation>
      <Lists>
        <List
          onClick={() => onClick("/")}
          selected={nav === "/" ? "#e9c46a" : "#ffffff"}
        >
          <Link to="/">Home</Link>
        </List>
        <List
          onClick={() => onClick("/search")}
          selected={nav === "/search" ? "#e9c46a" : "#ffffff"}
        >
          <Link to="/search">Search</Link>
        </List>
        <List
          onClick={() => onClick("/profile")}
          selected={nav === "/profile" ? "#e9c46a" : "#ffffff"}
        >
          {session.loggedIn ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </List>
      </Lists>
    </Navigation>
  );
};

export default Nav;
