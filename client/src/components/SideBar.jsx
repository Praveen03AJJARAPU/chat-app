import { GrHomeRounded } from "react-icons/gr";
import { BiLogoTelegram } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { RiHome2Line } from "react-icons/ri";
import { iconsStyling } from "../constants";

const SideBar = ({ userProfile }) => {
  // const [image, setImage] = useState('');
  // useEffect(() => {
  //   setImage(userProfile.photo)
  // },[userProfile])
  return (
    <div className="lg:h-[90vh] border-r-[1px] border-slate-200 gap-10 px-5 h-[100vh] relative flex flex-col items-center justify-start bg-white">
      <div className="mt-10 text-blue-600 text-xl">
        <h2>Chattt</h2>
      </div>
      <div className="flex flex-col justify-center text-black gap-4 ">
        <div className={`${iconsStyling} lg:mr-3 `}>
        <RiHome2Line size={26}/>
          <p className="lg:block hidden">Home</p>
        </div>
        <div className={`${iconsStyling}`}>
          <BiLogoTelegram size={26} />
          <p className="lg:block hidden">Messages</p>
        </div>
        <div className={`${iconsStyling}`}>
          <GoHistory size={26} />
          <p className="lg:block hidden">Moments</p>
        </div>
        <div className={`${iconsStyling}`}>
          <MdGroups size={26} />
          <p className="lg:block hidden">Friends</p>
        </div>
        <div className={`${iconsStyling}`}>
          <IoMdSettings size={26} />
          <p className="lg:block hidden">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;