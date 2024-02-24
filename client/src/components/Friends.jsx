import { useEffect, useState } from "react"
import axios from 'axios'

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
    <div className="mt-2">
      {friends.filter(friend => friend._id !== id).map((friend) => (
        <div className="flex py-3 justify-between px-3 border-b-[1px] border-slate-600">
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
          <div>
            <p onClick={() => handleRequest(friend._id)} className="cursor-pointer" >Be a Friend</p>
            <p>Reject</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Friends