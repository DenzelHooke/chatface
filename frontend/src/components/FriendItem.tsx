import axios from "axios";
import { RootState } from "../../app/store";
import { setRoom, setFetchRoom } from "../../features/global/globalSlice";
import { useDispatch } from "react-redux";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const FriendItem = ({ item }: { item: FriendItem }) => {
  const dispatch = useDispatch();

  const onClick = (id: string) => {
    dispatch(setFetchRoom(true));
    dispatch(setRoom({ type: "user", _id: item._id, roomName: item.username }));
  };

  // TODO Implement framer motion to add on click animation
  return (
    <div
      className="p-2 flex space-x-2 shadow-lg rounded-[4px] border-borderGrey border bg-white hover:bg-gray-50 transition-all hover:cursor-pointer"
      onClick={() => onClick(item._id)}
    >
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
