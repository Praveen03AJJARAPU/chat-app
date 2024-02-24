import { useEffect, useState } from 'react'
import Register from '../components/Register'
import gsap from 'gsap'
import '../App.css'
import Login from '../components/Login'

const Auth = () => {
  const [ loggedIn, setIsLoggenIn ] = useState(true);
  useEffect(() => {
    if(loggedIn) {
      gsap.to('.refister', {y: '130vh', display:'hidden'})
      gsap.to('.lagin', {y: '-30vh', display:'block'})
    }else {
      gsap.to('.refister', {y: '30vh', display:'block'})
      gsap.to('.lagin', {y: '-130vh', display:'hidden'})
    }
  },[loggedIn])
  return (
    <div>
      <div className=" font-logo">
        <section className="flex auth relative flex-row justify-center items-center w-[100vw] h-[100vh] overflow-hidden ">
          <div className="flex  w-full justify-around">
            <div className="text-white hidden lg:block lg:w-[500px]">
              <h2 className="text-5xl mb-10">Making friends is easy!</h2>
              <p>
                Discover seamless communication with our chat app. Connect
                instantly, share freely, and engage effortlessly. Experience
                real-time conversations with privacy and ease. Join us and
                redefine your connection experience today
              </p>
            </div>
            <div className='flex flex-col'>
              <div className="refister">
                <Register setIsLoggenIn={setIsLoggenIn} loggedIn={loggedIn} />
              </div>
              <div className="lagin hidden">
                <Login setIsLoggenIn={setIsLoggenIn} />
              </div>
            </div>
          </div>
          {/* <div
            className="hidden lg:block round absolute h-[200vh] w-[150vw] bg-black rounded-full -bottom-[40vh] right-[100vh]"
          ></div> */}
          {/* <p className='register-p text-5xl text-white absolute'>Join to chat with the strangers.</p> */}
          {/* <div className="login-p absolute left-[10%] text-white">
            <h1>Login</h1>
            <p> Please log in to start chatting with your friends.</p>
          </div> */}
        </section>
      </div>
      
    </div>
  );
}

export default Auth