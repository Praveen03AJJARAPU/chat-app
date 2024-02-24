import axios from 'axios'
import Auth from './pages/Auth';
import Chats from './pages/Chats'
import {Routes, Route} from 'react-router-dom'
import UserDetails from './pages/UserDetails';
import { useState } from 'react';
function App() {

  axios.defaults.baseURL= 'http://localhost:8000';
  axios.defaults.withCredentials = true;
  const [userEmail, setUserEmail] = useState('');


  return (
    <Routes>
      <Route  path='/' element={<Auth setUserEmail={setUserEmail} />} />
      <Route  path='/chats/:emailId' element={<Chats />} />
      <Route path='/register/:emailId' element={<UserDetails  />}/>
    </Routes>
  )
}

export default App
