import React from 'react'

const Moments = () => {
  return (
    <div className="bg-white  contacts border-t-4 border-blue-400 overflow-y-scroll lg:w-[350px] h-[100vh]  lg:h-[90vh]">
      <p className="text-4xl mt-8 mb-2 px-5">Moments</p>
      {/* {userRequests.length == 0 &&
        userRequests.map((req) => ( */}
      <div className="flex py-3 justify-between px-3 border-b-[1px] border-slate-200">
        <div className="flex gap-5">
          <img
            src={`../../public/dp.png`}
            className="w-[50px] h-[50px] object-cover rounded-full"
            alt=""
          />
          <div className="flex flex-col items-start">
            <p>name</p>
            <p className='text-sm'>12:00 AM</p>
          </div>
        </div>
        
      </div>
      {/* ))} */}
    </div>
  )
}

export default Moments