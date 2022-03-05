import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: #fd3535;
  border-radius: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #ffffff99;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const boxVariants = {
  hover: { scale: 1.2, rotate: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: {
    backgroundColor: "rgb(31, 255, 203)",
    transition: { duration: 0.2 },
  },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Box ref={biggerBoxRef}>
        <SmallBox
          drag
          dragSnapToOrigin
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileDrag="drag"
          whileHover="hover"
          whileTap="click"
        />
      </Box>
    </Wrapper>
  );
}

export default App;
