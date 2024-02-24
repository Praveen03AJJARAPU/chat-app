import { useEffect, useState } from "react";
import DpComponent from "./DpComponent";
import Messages from "./Messages";
import TypingCompo from "./TypingCompo";

const ChatComponent = ({setProfileWidth, id, profiles, selectedChat }) => {
  const [receiverID, setReceiverID] = useState('');
  useEffect(() => {
    if (profiles[selectedChat]) {
      setReceiverID(profiles[selectedChat]._id);
    }
     
     console.log(id)
     console.log(receiverID)
  },[profiles,selectedChat])
  return (
    <div className=" pt1 flex-1 border-t-4 border-blue-400 h-[100vh] lg:h-[90vh] relative">
      <DpComponent
        setProfileWidth={setProfileWidth}
        profiles={profiles}
        selectedChat={selectedChat}
      />
      <Messages id={id} receiverID={receiverID} />
      <TypingCompo id={id} profiles={profiles} selectedChat={selectedChat} />
    </div>
  );
}

export default ChatComponent