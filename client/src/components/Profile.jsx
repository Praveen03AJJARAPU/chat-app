import { RxCross2 } from "react-icons/rx";
import { MdOutlineReport } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import '../App.css'
import { useEffect } from "react";

const Profile = ({profileWidth, setProfileWidth, profiles, selectedChat}) => {
  
  return (
    <div style={{ width: profileWidth, transition: "width 0.5s" }}>
      {profileWidth !== "0%" && (
        <div className="lg:h-[90vh]  relative h-[100vh] border-2 py-5">
          <div className="text-center px-8">
            <img
              src={`http://localhost:8000/Images/${profiles[selectedChat]?.profile}`}
              className="w-[80px] h-[80px] rounded-full object-cover mx-auto mb-5"
              alt=""
            />
            <p className="text-2xl mb-1 font-semibold">{profiles[selectedChat]?.name}</p>
            <p className="text-xs text-slate-500 mb-5">{profiles[selectedChat]?.country}</p>
            <p className="font-semibold mb-10">
              {profiles[selectedChat]?.bio}
            </p>
          </div>
          <div className="border-y-2 text-center flex flex-col gap-2 my-5 py-3">
            <p>Email: {profiles[selectedChat]?.email} </p>
            {/* <p>phone: 8008473220 </p> */}
          </div>
          <div className="text-red-600 flex flex-col gap-3 font-semibold mx-5">
            <div className="flex  gap-3">
              <BiSolidDislike size={25} />
              <p className="mb-1">Report user</p>
            </div>
            <div className="flex  -mt-1 gap-3">
              <MdOutlineReport size={28} />
              <p>Block user</p>
            </div>
            <div className="flex  gap-3">
              <MdDelete size={25} />
              <p>Delete chat</p>
            </div>
          </div>
          <div
            className="absolute top-[3%] cursor-pointer right-[5%]"
            onClick={() => setProfileWidth("0%")}
          >
            <RxCross2 size={25} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile