import ChatComponent from "../components/ChatComponent";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Search from "../components/Search";

const Chats = () => {
  const [profileWidth, setProfileWidth] = useState("0%");
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedChat, setSelectedChat] = useState(0);
  const { emailId } = useParams();
  const [userProfile, setUserProfile] = useState({
    name: "",
    bio: "",
    village: "",
    country: "",
    photo: "",
    id: "",
  });

 

  useEffect(() => {
    console.log(emailId);
    axios
      .get(`/user-profile/${emailId}`)
      .then((response) => {
        const { name, bio, photo, country, village, id, friends, requests } =
          response.data;
        setUserProfile({
          name: name,
          bio: bio,
          country: country,
          village: village,
          photo: photo,
          id: id,
        });
        setRequests(requests);
        setFriends(friends);
      })
      .catch((error) => console.error(error));
    console.log(userProfile?.id);
  }, [emailId]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const requestData = await Promise.all(
          friends.map((friend) => axios.get(`/userRequests/${friend}`))
        );
        const userData = requestData.map((response) => response.data);
        setProfiles(userData);
        console.log(profiles);
      } catch (error) {
        console.log(error);
      }
    };

    if (friends.length > 0) {
      fetchProfiles();
    }
  }, [friends]);

  return (
    <div className="relative bg-slate-300 font-logo overflow-hidden h-[100vh]">
      <div className="flex h-full  items-center shadow-2xl rounded-2xl lg:px-10 lg:py-5  z-50">
        <div className="flex w-full items-center rounded-2xl overflow-hidden">
          <SideBar userProfile={userProfile} />
          <Search
            id={userProfile.id}
            requests={requests}
            profiles={profiles}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <div className="flex flex-1">
            <ChatComponent
              setProfileWidth={setProfileWidth}
              profileWidth={profileWidth}
              profiles={profiles}
              selectedChat={selectedChat}
              id={userProfile.id}
            />
            <Profile
              profileWidth={profileWidth}
              setProfileWidth={setProfileWidth}
              profiles={profiles}
              selectedChat={selectedChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
