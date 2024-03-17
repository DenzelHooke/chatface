import { UserItem, FriendRequestSuccess } from "../types/users";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import SpinningLoader from "./utils/SpinningLoader";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../features/global/globalSlice";


const AddFriendItem = ({ item }: { item: UserItem }) => {
  const dispatch = useDispatch()
  
  const [isLoading, setIsLoading] = useState(false);

  const sendFriendRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      // Send post request to add user based off user id
      return await axios.post("http://localhost:3000/api/friends/add", {
        id: id,
      });
    },
    onSuccess: (data) => {
      const status: FriendRequestSuccess = data.data

      // Triggers artificial delay for at least x amount if seconds(or ms) guranteed.
      //   This is to make sure loading spinner can be shown (cheeky, i know...)

      setTimeout(() => {
        setIsLoading(false)
        dispatch(setSuccess(status.message))
      }, 500);
    },
  });


  const onClick = (id: string) => {
    if (isLoading) {
      return;
    }

    // Enable loading state
    setIsLoading(true);

    // Send reques to backend
    sendFriendRequestMutation.mutate(id);
  };

  return (
    <div
      className="min-h-[50px] p-2 flex space-x-4 items-center mb-5 border-borderGrey border-[1px] rounded-md transition-all ease-in-out"
      data-user-id={item._id}
      key={uuidv4()}
    >
      <img
        src="https://images.pexels.com/photos/7360385/pexels-photo-7360385.jpeg"
        alt="Head shot"
        className="w-[45px] h-[45px] rounded-full object-cover"
      />
      <p className="font-medium flex-grow">{item.username}</p>
      <button
        className="bg-lightBlue hover:bg-deepBrightBlue rounded-md text-white min-w-[100px] py-1 px-4"
        onClick={() => onClick(item._id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <SpinningLoader />
        ) : (
          <>
            <p>Send Friend Request</p>
          </>
        )}
      </button>
    </div>
  );
};
export default AddFriendItem;
