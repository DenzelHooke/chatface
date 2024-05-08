import { useState } from "react";
import { setRoom, setFetchRoom } from "../../features/global/globalSlice";
import { useDispatch } from "react-redux";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const FriendItem = ({
  selected,
  item,
  disabled,
  isRequestMode,
  onAccept,
  onDelete,
  onSelect,
}: {
  selected?: boolean;
  item: FriendItem;
  disabled: boolean;
  isRequestMode: boolean;
  onAccept: (id: string) => any;
  onDelete: (id: string) => any;
  onSelect?: (id: string) => void;
}) => {
  const dispatch = useDispatch();

  const onClick = (id: string) => {
    if (disabled) {
      return;
    }

    if (onSelect) {
      // Passes id of iten so styling can be applied
      onSelect(item._id);
    }

    dispatch(setFetchRoom(true));
    dispatch(setRoom({ type: "user", _id: item._id, roomName: item.username }));
  };

  // TODO Implement framer motion to add on click animation
  return (
    <div
      className={`p-2 flex space-x-2 rounded-[4px] bg-white relative ${
        selected ? "shadow-medium" : ""
      } ${
        !disabled ? "hover:bg-gray-50 transition-all hover:cursor-pointer" : ""
      }`}
      onClick={() => onClick(item._id)}
    >
      {!isRequestMode && (
        // <div
        //   className="bg-red-500 text-white font-bold p-4 rounded-full absolute right-[-10px] top-[-10px] w-5 h-5 flex justify-center items-center cursor-pointer hover:bg-red-600 transition-all"
        //   onClick={() => onDelete(item._id)}
        // >
        //   X
        // </div>
        <></>
      )}
      <img
        src={item.profilePicture}
        alt="Profile picture"
        className="w-[50px] h-[50px] rounded-md"
      />
      <div className="">
        <p className="font-medium text-sm">{item.username}</p>
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
