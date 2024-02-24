import { useEffect, useState } from "react";
import axios from 'axios'
import {motion} from 'framer-motion'
import { headings, inpStyling } from "../constants";
import { useNavigate } from "react-router";
import gsap from "gsap";

const Register = ({setIsLoggenIn, loggedIn}) => {
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = info;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (!data.error) {
        navigate(`/register/${email}`)
        setInfo({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error.message);
    }
  
  };
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        originY: 'top',
        transition: { duration: 0.3, delay: 1.2, ease: "easeIn" },
      }}
      className="shadow-xl  px-10 backdrop-blur-xl py-5 rounded-xl"
    >
      <h2 className={`${headings} text-white mb-5`}>Register</h2>
      <form action="#" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <input
            type="text"
            placeholder="Username"
            value={info.name}
            className={`${inpStyling} inp`}
            required
            
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />

          <input
            className={inpStyling}
            type="email"
            placeholder="Email"
            value={info.email}
            required
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />

          <input
            type="password"
            className={inpStyling}
            placeholder="Password"
            value={info.password}
            required
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />

          <button type="submit" className={`bg-white px-5 py-3 w-[300px] rounded-full`}>
            Submit
          </button>
          <p
            className="text-xs text-white mx-auto"
            onClick={() => setIsLoggenIn(true)}
          >
            Already have an account?{" "}
            <a href="#" className="underline font-bold" onClick={() => setIsLoggenIn(true)}>
              Sign in here
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

export default Register