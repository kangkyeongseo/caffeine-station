import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Component = styled.div`
  display: flex;
  align-items: center;
  max-width: 480px;
  height: 60px;
  margin: 0 auto;
  padding-top: 10px;
  background-color: #246653;
  color: #ffffff;
`;

const Logo = styled.div`
  margin-left: 40px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Header = () => {
  return (
    <Component>
      <Logo>
        <Link to="/">
          caffeine station
          <FontAwesomeIcon icon={faCoffee} style={{ marginLeft: 5 }} />
        </Link>
      </Logo>
    </Component>
  );
};

export default Header;
