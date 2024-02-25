import '../App.css'
import Contacts from "./Contacts";
import Friends from "./Friends";
import FriendRequests from "./FriendRequests";
const Search = ({id, requests, profiles, selectedChat, setSelectedChat}) => {
  return (
    <div className="bg-white  contacts border-t-4 border-blue-400 overflow-y-scroll lg:w-[350px] h-[100vh]  lg:h-[90vh]">
      <h3 className="text-4xl px-5 mt-8 mb-2">Chats</h3>
      <div className="relative pt-1 bg-white text-black flex flex-col mb-2 ">
        <input
          type="text"
          className=" border-b-[1px] border-white rounded-full bg-slate-100 my-2 py-2 px-3 lg:px-10 outline-none "
          placeholder="Enter for search"
        />
       
        {/* <div className="flex relative w-full  justify-around my-3 text-lg">
          <p>Chats</p>
          <p>Friends</p>
          <div className="dash"></div>
        </div> */}
      </div>
      <Contacts id={id} profiles={profiles} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      {/* <FriendRequests  id={id} requests={requests} /> */}
      
    </div>
  );
}

export default Search