import axios from "axios";
import { RootState } from "../../app/store";
import { setRoom, setFetchRoom } from "../../features/global/globalSlice";
import { useDispatch } from "react-redux";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const FriendItem = ({
  item,
  disabled,
  isRequestMode,
  onAccept,
  onDelete,
}: {
  item: FriendItem;
  disabled: boolean;
  isRequestMode: boolean;
  onAccept: (id: string) => any;
  onDelete: (id: string) => any;
}) => {
  const dispatch = useDispatch();

  const onClick = (id: string) => {
    if (disabled) {
      return;
    }
    dispatch(setFetchRoom(true));
    dispatch(setRoom({ type: "user", _id: item._id, roomName: item.username }));
  };

  // TODO Implement framer motion to add on click animation
  return (
    <div
      className={`p-2 flex space-x-2 shadow-lg rounded-[4px] border-borderGrey border bg-white relative ${
        !disabled ? "hover:bg-gray-50 transition-all hover:cursor-pointer" : ""
      }`}
      onClick={() => onClick(item._id)}
    >
      {!isRequestMode && (
        <div
          className="bg-red-500 text-white font-bold p-4 rounded-full absolute right-[-10px] top-[-10px] w-5 h-5 flex justify-center items-center cursor-pointer hover:bg-red-600 transition-all"
          onClick={() => onDelete(item._id)}
        >
          X
        </div>
      )}
      <img
        src={item.profilePicture}
        alt="Profile picture"
        className="w-[62px] h-[65px] rounded-sm"
      />
      <div className="">
        <p className="font-medium text-md">{item.username}</p>
        {isRequestMode && (
          <>
            <button
              className="bg-green-400 p-1 px-6 rounded-md hover:bg-green-500 transition-all"
              onClick={() => onAccept(item._id)}
            >
              Accept Request
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendItem;
