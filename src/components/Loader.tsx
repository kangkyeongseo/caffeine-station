import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled(motion.div)`
  color: #144235;
`;

const spinnerVars = {
  start: { rotateZ: 0 },
  end: {
    rotateZ: 360,
    transition: { duration: 1.5, repeat: Infinity },
  },
};

const Loader = () => {
  return (
    <Container>
      <Spinner variants={spinnerVars} initial="start" animate="end">
        <FontAwesomeIcon icon={faSpinner} size={"2x"} />
      </Spinner>
    </Container>
  );
};

export default Loader;
