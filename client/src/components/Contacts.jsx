import "../App.css";

const Contacts = ({ profiles, setSelectedChat, selectedChat }) => {
  return (
    <section>
      <div>
        {profiles.length > 0 &&
          profiles.map((item, id) => (
            <div
              key={item._id}
              onClick={() => {
                setSelectedChat(id)
                console.log("first")
              }
              }
              className={`flex ${
                id === selectedChat ? "bg-slate-100" : ""
              } px-5 items-end justify-between border-b-[1px] border-b-slate-200  py-3`}
            >
              <div className="flex items-center gap-3 lg:gap-3">
                <img
                  src={`http://localhost:8000/Images/${item.profile}`}
                  className="lg:w-[50px] w-[35px] h-[35px] lg:h-[50px] rounded-full object-cover"
                  alt=""
                />
                <div>
                  <p>{item.name}</p>
                  <p className="text-xs">{item.bio}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400">12:00</p>
            </div>
          ))}
        {profiles.length == 0 && <p>No friends</p>}
      </div>
    </section>
  );
};

export default Contacts;
