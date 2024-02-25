import { CiFileOn } from "react-icons/ci";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useState } from "react";
import axios from 'axios' 

const TypingCompo = ({id, profiles, selectedChat}) => {
  const [ message, setMessage ] = useState('');
  const handleMessageSubmission = (e) => {
    e.preventDefault();
    console.log(message)
    axios.post('/send-message', {senderID: id, receiverID: profiles[selectedChat]._id, messageText: message})
    .then((res) => setMessage(''))
    .catch((err) => console.log(err))
  }
  return (
    
      <div className="relative flex  gap-2 items-center">
        <form onSubmit={(e) => handleMessageSubmission(e)}>
          <input
            type="text"
            placeholder="Type message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="outline-none w-full border-2 px-5 line-none py-2 lg:w-[500px] rounded-xl bg-white"
          />
        </form>
        <div className="absolute top-2 text-blue-400 left-3">
          <CiFileOn size={25} />
        </div>
        <div className="absolute right-[15%] text-blue-400">
          <BsEmojiSunglasses size={20} />
        </div>
        <p className="px-4 bg-blue-400 text-white py-2 rounded-2xl">Send</p>
      </div>
    
  );
}

export default TypingCompo