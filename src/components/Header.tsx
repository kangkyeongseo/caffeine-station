import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flashState } from "Atom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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

const FlashContainer = styled.div<{ display: string }>`
  display: ${(props) => props.display};
`;

const FlashBg = styled.div<{ visibility: string }>`
  z-index: 2;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  visibility: ${(props) => props.visibility};
`;

const FlashBox = styled(motion.div)`
  z-index: 3;
  position: fixed;
  top: 300px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 300px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const FlashText = styled.div``;

const FlashBtn = styled.button`
  padding: 7px 15px;
  border: none;
  border-radius: 10px;
  background-color: #246653;
  color: #ffffff;
`;

const Header = () => {
  const [flash, setFlash] = useRecoilState(flashState);
  const [visibility, setVisibility] = useState("hidden");
  const [popup, setPopup] = useState(false);
  const boxVars = {
    start: { opacity: 0, scale: 0.5 },
    end: {
      opacity: popup ? 1 : 0,
      scale: popup ? 1 : 0.5,
      transition: { type: "spring", duration: 0.5 },
    },
  };

  useEffect(() => {
    if (flash.length > 0) {
      setVisibility("visible");
      setPopup(true);
    }
  }, [flash]);

  const onClick = () => {
    setVisibility("hidden");
    setPopup(false);
    setTimeout(() => {
      setFlash("");
    }, 500);
  };

  console.log(popup);
  return (
    <>
      <FlashBox variants={boxVars} initial="start" animate="end">
        <FlashText>{flash}</FlashText>
        <FlashBtn onClick={onClick}>확인</FlashBtn>
      </FlashBox>
      <FlashBg visibility={visibility} />
      <Component>
        <Logo>
          <Link to="/">
            caffeine station
            <FontAwesomeIcon icon={faCoffee} style={{ marginLeft: 5 }} />
          </Link>
        </Logo>
      </Component>
    </>
  );
};

export default Header;
