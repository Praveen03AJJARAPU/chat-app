import { motion } from 'framer-motion'
import { headings, inpStyling } from '../constants'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Login = ({setIsLoggenIn}) => {
  const navigate = useNavigate();
  const [ info, setInfo ] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = info;
    try {
      const response = await axios.post('/login', {email, password});
      if(await response.data.success == true) {
        navigate(`/chats/${email}`);
        setInfo({
          email: "", password: ""
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div
      // initial={{scale: 0, transition: {duration: .3, delay: 1.2, ease: 'easeIn'} }}
      // whileInView={{scale:1,  transition: {duration: .3, delay: 1.2, ease: 'easeIn'}}}
      className="shadow-xl font-logo px-10 backdrop-blur-xl py-5 rounded-xl"
    >
        <h2 className={`${headings} text-white mb-5`}>Login</h2>
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-8">
            <input
              className={inpStyling}
              type="email"
              placeholder="Email-ID"
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

            <button type="submit" className='bg-white px-5 py-3 w-[300px] rounded-full'>
              Submit
            </button>
            <p className="text-xs text-white mx-auto" onClick={() => setIsLoggenIn(false)}>
              Don't have an account?{" "}
              <a href="#" className="underline font-bold" onClick={() => setIsLoggenIn(false)}>
                Sign up here
              </a>
            </p>
          </div>
        </form>

    </motion.div>
  );
}

export default Login