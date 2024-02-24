
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { regStyling } from "../constants";
import { useEffect, useState } from "react";
import img from '../assets/dp-none.webp';
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const UserDetails = () => {
  const { emailId } = useParams(); 
  const nav = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    bio: "",
    country: "",
    village: "",
  });
  const [photo, setPhoto] = useState(img);

  const handleDetails = async (e) => {
    e.preventDefault();
    
    const {name, bio, country, village} = details;
    
    try {
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", emailId);
      formData.append("bio", bio);
      formData.append("country", country);
      formData.append("village", village);
      formData.append("photo", photo);
      setPhoto(photo);
      nav(`/chats/${emailId}`)
      const {data} = await axios.post('/upload', formData);

    } catch (er) {
      console.log(er);
    }
  }
  useEffect(() => {
    axios.get(`/user-profile/${emailId}`).then((res) => setPhoto(res.data.photo))
    // console.log()
  },[])
  return (
    <div className="register  w-full h-[100vh] flex border-2 ">
      <form onSubmit={(e) => handleDetails(e)}>
        <div className="flex bg-white rounded-xl flex-col py-5 gap-7 px-20 border-2">
          <div className="relative">
          <img
            src={`http://localhost:8000/Images/${photo}`}
            // {photo}
            
            className="w-[100px] h-[100px] rounded-full object-cover"
            alt=""
          />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className="absolute cursor-pointer -bottom-4 -right-1 w-[50px] rounded-full text-white p-3 mx-auto  bg-blue-500"
            >
              <MdOutlineAddPhotoAlternate size={28} />{" "}
            </label>
          </div>
          <div>
            <p className="mb-1">Name:</p>
            <input
              required
              type="text"
              className={`${regStyling}`}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </div>
          
          <div>
            <p className="mb-1">Bio:</p>
            <input
              required
              type="text"
              className={`${regStyling}`}
              onChange={(e) => setDetails({ ...details, bio: e.target.value })}
            />
          </div>
          <div>
            <p>City/Village:</p>
            <input
              required
              type="text"
              className={`${regStyling}`}
              onChange={(e) =>
                setDetails({ ...details, village: e.target.value })
              }
            />
          </div>
          <div>
            <p>Country:</p>
            <input
              required
              type="text"
              className={`${regStyling}`}
              onChange={(e) =>
                setDetails({ ...details, country: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="px-10 py-2 bg-black hover:bg-white border-2 hover:border-black rounded-3xl text-white hover:text-black transition-all ease duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails