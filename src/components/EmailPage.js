import React, {useState, lazy} from 'react';
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import emailjs from '@emailjs/browser';
import { mediaQueries } from "./Themes";
import BigTitle from '../subComponents/BigTitle';
import emailninja from "../assets/Images/email-ninja.jpg"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SocialIcons = lazy(() => import("../subComponents/SocialIcons"));
const LogoComponent = lazy(() => import("../subComponents/LogoComponent"));
const PowerButton = lazy(() => import("../subComponents/PowerButton"));


const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`


  const Main = styled(motion.div)`
  border: 3px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: .5rem;
  width: 30vw;
  height: 60vh;
  z-index: 3;
  line-height: 1;
  border-radius: 0 50px 0 50px;

  ${mediaQueries(60)`
            height: 55vh;
  `};

  ${mediaQueries(50)`
              width: 50vw;
              height: max-content;

  `};

  font-family: "Ubuntu Mono", monospace;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};
  }
`;
const float = keyframes`
0% { transform: translateY(-10px)         }
    50% { transform: translateY(15px) translateX(15px)        }
    100% { transform: translateY(-10px)         }
`
const SpaceMan = styled(motion.div)`
  position: absolute;
  top: 10%;
  right: 5%;
  animation: ${float} 4s ease infinite;
width:20vw;
  img{
    width:100%;
    height:auto;
  }
`
  const Send = styled.button`
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};

  padding: 0.8rem calc(1rem + 1vw);
  border-radius: 0 0 0 50px;
  font-size: calc(1em + 0.5vw);

  ${Main}:hover & {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
}

function EmailPage() {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [subject, setSubject] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

const submitHandler = async (e) => {
  e.preventDefault();
  if(!name || !email || !subject || !message) {
    return toast.error('Please Fill name, email, subject, and message');
  }
  try {
    setLoading(true);
    const { data } = await axios.post(`/api/email`, {
      name,
      subject,
      email,
      message,
    });
    setLoading(false);
    toast.success(data.message);
  } catch (err) {
    setLoading(false);
    toast.error( 
     err.response && err.response.data.message
      ? err.response.data.message
      : err.message
      );
  }
};
  
  return (

  <Box
  variants={container}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, transition: { duration: 1.5 } }}
  exit={{ opacity: 0, transition: { duration: 0.5 } }}
  > 
  <ToastContainer position="bottom-center" limit={1} />
        
        <form onSubmit={submitHandler}>
        <Main
        initial={{ height: 250 }}
        animate={{ height: 500 }}
        transition={{ type: "spring", duration: 2.5, delay: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }} >
        <h1>Send Email</h1>
        
        <label htmlFor="Name">Name</label>
        <input  type="text" name="user_name" onChange ={(e) => setName(e.target.value)}size="50" />
        
        <label htmlFor="message">Subject</label>
        <input id="subject" type="text" onChange ={ (e) => setSubject(e.target.value)}></input>
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" onChange ={ (e) => setEmail(e.target.value)}  size="50" />
        
        <label htmlFor="message">Message</label>
        
        <textarea id="message" onChange={(e) => setMessage(e.target.value)}  rows="8" />
        
        <Send input value="Send Email" disabled={loading} type="submit"> {loading ? 'Sending...' : 'Submit'}
          
        </Send>
       
        </Main>
        </form>
        
        

    <SocialIcons theme="light" />
    <LogoComponent theme="light" />
    <PowerButton />
    <BigTitle text="Email" top="10%" right="70%" />
  </Box>
  
  );
}

export default EmailPage;


