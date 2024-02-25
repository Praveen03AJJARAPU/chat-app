import { useEffect, useState } from "react";
import DpComponent from "./DpComponent";
import Messages from "./Messages";
import TypingCompo from "./TypingCompo";

const ChatComponent = ({setProfileWidth, name, dp, id, profiles, profileWidth, selectedChat }) => {
  const [receiverID, setReceiverID] = useState('');
  useEffect(() => {
    if (profiles[selectedChat]) {
      setReceiverID(profiles[selectedChat]._id);
    }
     
     console.log(id)
     console.log(receiverID)
  },[profiles,selectedChat])
  return (
    <div
      className={`${
        profileWidth !== "0%" ? "blur-sm hidden lg:block" : "block"
      } w-full  h-[100vh] lg:h-[90vh] `}
    >
      <DpComponent
        setProfileWidth={setProfileWidth}
        profiles={profiles}
        selectedChat={selectedChat}
        />
      <Messages
        id={id}
        selectedChat={selectedChat}
        profiles={profiles}
        name={name}
        receiverID={receiverID}
        dp={dp}
      />
      <TypingCompo id={id} profiles={profiles} selectedChat={selectedChat} />
    </div>
  );
}

export default ChatComponent