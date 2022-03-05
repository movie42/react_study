import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
  width: 100px;
  height: 100px;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const box = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextItem = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const prevItem = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}>
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextItem}>Next</button>
      <button onClick={prevItem}>Prev</button>
    </Wrapper>
  );
}

export default App;
