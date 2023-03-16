import { Link } from "react-router-dom";
import styled from "styled-components";

const Component = styled.div`
  display: flex;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;

  background-color: #246653;
  color: #ffffff;
  font-size: 16px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  a {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const Header = () => {
  return (
    <Component>
      <Logo>
        <Link to="/">caffeine station</Link>
      </Logo>
    </Component>
  );
};

export default Header;
