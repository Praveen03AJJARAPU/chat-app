import { IoSearchSharp } from "react-icons/io5";
import '../App.css'
import Contacts from "./Contacts";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";
const Search = ({id, requests, profiles, selectedChat, setSelectedChat}) => {
  return (
    <div className="bg-white  contacts border-t-4 border-blue-400 overflow-y-scroll lg:w-[350px] h-[100vh]  lg:h-[90vh]">
      <div className="relative pt-1 bg-white text-black flex flex-col shadow-xl ">
        <input
          type="text"
          className=" border-b-[1px] border-white my-2 py-2 px-3 lg:px-10 outline-none "
          placeholder="Enter for search"
        />
        <IoSearchSharp
          className="absolute hidden lg:block top-5 left-[58px] "
          size={20}
        />
        <div className="flex relative w-full  justify-around my-3 text-lg">
          <p>Chats</p>
          <p>Friends</p>
          <div className="dash"></div>
        </div>
      </div>
      <Contacts id={id} profiles={profiles} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      {/* <FriendRequests  id={id} requests={requests} /> */}
      {/* <Friends id={id}/> */}
    </div>
  );
}

export default Search