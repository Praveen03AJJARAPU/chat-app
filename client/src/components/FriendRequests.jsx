import axios from "axios";
import { useEffect, useState } from "react"


const FriendRequests = ({id, requests}) => {
    const [userRequests, setUserRequests ] = useState([]);
    const acceptRequests = (acceptedId) => {
        axios.post(`/acceptRequests/${id}`, { acceptedId })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const requestData = await Promise.all(requests.map(request => 
                    axios.get(`/userRequests/${request}`)    
                ))
                const userData = requestData.map(response => response.data);
                setUserRequests(userData);
                console.log(userRequests)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequest();
    
    },[requests])
  return (
    <div>
      <p className="text-4xl mt-8 mb-2 px-5">Friend Requests</p>
      {/* {userRequests.length == 0 &&
        userRequests.map((req) => ( */}
      <div className="flex py-3 justify-between px-3 border-b-[1px] border-slate-300">
        <div className="flex gap-3">
          <img
            src={`../../public/dp.png`}
            className="w-[50px] h-[50px] object-cover rounded-full"
            alt=""
          />
          <div className="flex flex-col items-start">
            <p>name</p>
            <p>friend.bio</p>
          </div>
        </div>
        <div className="text-white">
          <p
            //   onClick={() => handleRequest(friend._id)}
            className="cursor-pointer bg-green-400 px-2"
          >
            Accept Request
          </p>
          <p className="bg-red-500 mt-2 text-center">Reject</p>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}

export default FriendRequests