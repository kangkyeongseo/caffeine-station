import { Link } from "react-router-dom";
import { sessionState } from "Atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Navigation = styled.nav`
  max-width: 480px;
  margin: 0 auto;
  background-color: #246653;
  color: #ffffff;
  font-size: 16px;
`;

const Lists = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const List = styled.li`
  width: 100%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    &:hover {
      background-color: #144235;
    }
  }
`;

const Nav = () => {
  const [session, setSession] = useRecoilState(sessionState);
  return (
    <Navigation>
      <Lists>
        <List>
          <Link to="/">Home</Link>
        </List>
        <List>
          <Link to="/search">Search</Link>
        </List>
        <List>
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
