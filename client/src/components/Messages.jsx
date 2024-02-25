import { useEffect, useState } from 'react';
import '../App.css'
import Message from './Message'
import axios from 'axios';
import io from 'socket.io-client'
// const socket = io('http://localhost:8000');
const Messages = ({ id, receiverID, dp, name, profiles, selectedChat }) => {
  // const [ chats, setChats ] = useState([]);
  
  useEffect(() => {
    // socket.emit('join-conversation', {senderID: id, receiverID});
    // socket.on('new-message', (message) => {
    //   setChats((prev) => [...prev, message]);
    // })
    // axios
    //   .get("/get-messages", { params: { userID: id, receiverID } })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
    // console.log(chats)
  }, [id, receiverID]);
  return (
    <div className="h-[83%] bg-slate-100 lg:h-[80%] messages ">
      <Message
        dp={dp}
        name={name}
        profiles={profiles}
        selectedChat={selectedChat}
      />
    </div>
  );
};
  
export default Messages