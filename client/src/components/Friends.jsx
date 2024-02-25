import { useEffect, useState } from "react"
import axios from 'axios'
import FriendRequests from "./FriendRequests";

const Friends = ({id}) => {
  const [ friends, setFriends ] = useState([]);
 
  useEffect(() => {
    axios
      .get("/friends-list")
      .then((res) => {
        setFriends(res.data)
        console.log(friends)
      })
      .catch((err) => console.log(err));
  },[id]);



  const handleRequest = (senderId) => {
    console.log(`/send-request/${id}`)
    axios.post(`/send-request/${id}`, {senderId})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  return (
    <div className="bg-white  contacts border-t-4 border-blue-400 overflow-y-scroll lg:w-[350px] h-[100vh]  lg:h-[90vh]">
      <FriendRequests />
      <p className="text-4xl mt-8 mb-2 px-5">Friends</p>
      <div className="mt-2">
        {friends
          .filter((friend) => friend._id !== id)
          .map((friend) => (
            <div className="flex py-3 justify-between px-3 border-b-[1px] border-slate-300">
              <div className="flex gap-3">
                <img
                  src={`http://localhost:8000/Images/${friend.profile}`}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt=""
                />
                <div className="flex flex-col items-start">
                  <p>{friend.name}</p>
                  <p>{friend.bio}</p>
                </div>
              </div>
              <div className="text-white">
                <p
                  onClick={() => handleRequest(friend._id)}
                  className="cursor-pointer bg-green-400 px-2"
                >
                  Be a Friend
                </p>
                <p className="bg-red-500 mt-2 text-center">Reject</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Friends