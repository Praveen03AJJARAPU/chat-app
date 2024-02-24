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
    <div >
       {userRequests.length > 0 &&  userRequests.map((req) => (
        <div className="flex justify-between px-2 py-2 border-b-[1px] border-black">
            <p>{req.bio}</p>
            <p className="cursor-pointer" onClick={() => acceptRequests(req._id)}>Accept</p>
        </div>
       ))}
    </div>
  )
}

export default FriendRequests