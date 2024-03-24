import axios from "axios";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const FriendItem = ({ item }: { item: FriendItem }) => {
  const onClick = (id: string) => {
    console.log(id);
  };

  // TODO Implement framer motion to add on click animation
  return (
    <div className="p-2 flex space-x-2 shadow-lg rounded-[4px] border-borderGrey border bg-white hover:bg-gray-50 transition-all hover:cursor-pointer">
      <img
        src={item.profilePicture}
        alt="Profile picture"
        className="w-[62px] h-[65px] rounded-sm"
      />
      <p className="font-medium text-md">{item.username}</p>
    </div>
  );
};
export default FriendItem;
