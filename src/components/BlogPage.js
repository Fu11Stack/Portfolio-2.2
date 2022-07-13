import styled from "styled-components";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import img from "../assets/Images/Res.png";
import { Blogs } from "./BlogData";

import BlogComponent from "./BlogComponent";
import Loading from "../subComponents/Loading";
import { mediaQueries } from "./Themes";

const AnchorComponent = lazy(() => import("../subComponents/Anchor"));
const SocialIcons = lazy(() => import("../subComponents/SocialIcons"));
const PowerButton = lazy(() => import("../subComponents/PowerButton"));
const LogoComponent = lazy(() => import("../subComponents/LogoComponent"));
const BigTitle = lazy(() => import("../subComponents/BigTitle"));

const MainContainer = styled(motion.div)`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  top: 40px;
  
  ${mediaQueries(40)`
  
  background-position: top;
  
  
  padding-top: 10vh;
  
`};
  
     ${mediaQueries(30)`
     background-size: 375px;
     background-position:  50% 40px;
     
     
     
       
`};
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  position: relative;
  padding-bottom: 5rem;
`;
 const Center = styled.div`
   
   justify-content: center;
   align-items: center;
   padding-top: 5rem;
  

//   ${mediaQueries(30)`
//     padding-top: 7rem;
    
  
//   `};
// `;

// const Grid = styled(motion.div)`
// padding: 0;

// z-index: 3;
// line-height: 1.5;
// display: grid;
// justify-content: center;
// align-items: center;
// font-size: calc(0.3rem + 1vw);
// backdrop-filter: blur(4px);
// grid-template-columns: 100%;




// margin: 0;

//   ${mediaQueries(50)`
//     grid-template-columns: 100%;

    
  
//   `};
// `;

 const container = {
   hidden: { opacity: 0 },
   show: {
     opacity: 1,
     transition: {
       staggerChildren: 0.5,
       duration: 0.5,
     },
   },
 };

const BlogPage = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let num = (window.innerHeight - 70) / 30;
    setNumber(parseInt(num));
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <MainContainer
        variants={container}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <Container>
          <LogoComponent />

          <PowerButton />

          <SocialIcons />
          <AnchorComponent number={number} />

          <Center>
         
          </Center>

          <BigTitle text="Resume" top="5rem" left="5rem" />
        </Container>
      </MainContainer>
    </Suspense>
  );
};

export default BlogPage;
