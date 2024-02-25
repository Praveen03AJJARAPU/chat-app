import { useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const Message = ({dp, name, profiles, selectedChat}) => {
    
  return (
    <div className="px-5 py-5  contacts z-50 ">
      <div className="flex justify-start items-start gap-3">
        <img
          src={`http://localhost:8000/Images/${dp}`}
          className="h-[30px] w-[30px] object-cover rounded-full"
          alt=""
        />

        <div className="flex flex-col gap-2 items-start">
          <p className="text-xs">{name}</p>
          <div
            style={{ wordWrap: "break-word" }}
            className="w-max text-black text-wrap p-2 flex items-end gap-5 rounded-3xl bg-white"
          >
            <span className="text-wrap max-w-[300px] whitespace-pre wrap">
              hi
            </span>
            <span className="text-[10px]">12:00 AM</span>
          </div>
        </div>
      </div>
      <div className="flex justify-start float-right items-start gap-3">
        <div className="flex flex-col gap-2 items-end">
          <p className="text-xs">{profiles[selectedChat]?.name}</p>
          <div
            style={{ wordWrap: "break-word" }}
            className="w-max text-black text-wrap p-2 flex items-end gap-5 rounded-3xl bg-white"
          >
            <span className="text-wrap max-w-[300px] whitespace-pre wrap">
              hi
            </span>
            <span className="text-[10px]">12:00 AM</span>
          </div>
        </div>
        <img
          src={`http://localhost:8000/Images/${profiles[selectedChat]?.profile}`}
          className="h-[30px]  w-[30px] object-cover rounded-full"
          alt=""
        />
      </div>
    </div>
  );
}
export default Message