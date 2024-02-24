import { useEffect } from 'react';
import '../App.css';
import axios from 'axios';

const Message = () => {
  
    
  return (
    <div className="px-5 py-5 font-pops contacts z-50 ">
      <div style={{wordWrap: 'break-word'}} className="w-max text-white text-wrap p-2 flex items-end gap-5 rounded-3xl bg-blue-400">
        <span className='text-wrap max-w-[300px] whitespace-pre wrap'>hi</span>
        <span className="text-[10px]">12:00 AM</span>
      </div>

      <div style={{wordWrap: 'break-word'}} className="w-max text-wrap p-2 flex items-end gap-5 rounded-3xl float-right  text-white bg-green-500">
        <span className='text-wrap max-w-[300px] whitespace-pre wrap'>Hi</span>
        <span className="text-[10px]">12:00 AM</span>
      </div>
    </div>
  );
}
export default Message