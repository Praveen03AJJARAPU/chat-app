import { IoIosCall } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

import {Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'

const DpComponent = ({setProfileWidth, profiles, selectedChat }) => {
  
  return (
   
      <div className="flex justify-between border-b-[1px] bg-white  py-3 border-slate-200 items-center">
        <div className="flex items-center gap-5">
          <img
            src={`http://localhost:8000/Images/${profiles[selectedChat]?.profile}`}
            className="w-[45px] h-[45px] object-cover rounded-full"
            alt=""
          />
          <div>
            <p className="font-semibold">{profiles[selectedChat]?.name}</p>
            <p className="text-xs">Last seen 800am</p>
          </div>
        </div>
        <div className="flex gap-5">
          <IoIosCall size={23} />
          <MdSearch size={23} />
          <Menu>
            <MenuButton>
              <IoMdMore size={23} />
            </MenuButton>
            <div className="bg-white z-50">
              <MenuList className="bg-white flex flex-col gap-2 py-3 rounded-2xl px-5 mt-3 shadow-2xl">
                <MenuItem onClick={() => setProfileWidth("40%")}>
                  Profile
                </MenuItem>
                <MenuItem>Clear chat</MenuItem>
                <MenuItem>Remove chat</MenuItem>
                <MenuItem>Block</MenuItem>
              </MenuList>
            </div>
          </Menu>
        </div>
      </div>
   
  );
}

export default DpComponent