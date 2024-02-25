import ChatComponent from "../components/ChatComponent";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import gsap from 'gsap'
import { useParams } from "react-router";
import Search from "../components/Search";
import Friends from "../components/Friends";
import { MdDocumentScanner } from "react-icons/md";
import Moments from "../components/Moments";

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

  useEffect(() => {
    if(profileWidth === "40%") {
      gsap.to('.profile', {x: 0, duration:1, ease: "power2.out"}) 
    }else {
      gsap.to('.profile', {x: "50vh", duration:3, ease: "power2.out"}) 
    }

  },[profileWidth])

  return (
    <div className="lg:px-10 lg:py-10 bg-slate-300">
      <div className="flex w-[100%] overflow-hidden lg:rounded-3xl font-logo bg-white  justify-start">
        <SideBar userProfile={userProfile} />
        <div className="flex flex-col">
          <Search
            id={userProfile.id}
            requests={requests}
            profiles={profiles}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <Friends id={userProfile.id} />
          <Moments />
        </div>

        <div className="relative flex-1">
          <div className="ease">
            <ChatComponent
              setProfileWidth={setProfileWidth}
              profileWidth={profileWidth}
              profiles={profiles}
              selectedChat={selectedChat}
              id={userProfile.id}
              dp={userProfile.photo}
              name={userProfile.name}
            />
          </div>
          <div
            className={`lg:absolute profile top-0 right-0 ${
              profileWidth !== "0%" ? "flex-1" : ""
            }`}
          >
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
