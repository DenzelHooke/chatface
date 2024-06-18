import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  resetRoom,
  setError,
  setFetchRoom,
  setRoom,
} from "../../features/global/globalSlice";
import FriendItem from "./FriendItem";
import SearchBar from "./Searchbar";
import AddFriend from "./AddFriend";
import { IoAddCircleSharp } from "react-icons/io5";
import { ResponseQueryObject, AcceptRequestDto } from "../types/types";

import { RootState } from "../../app/store";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}
const queryInterval = 5 * 1000;

const generateFriendsArray = (
  response: ResponseQueryObject,
  deleteMutate: any,
  onFriendItemSelect: (item: FriendItem) => void,
  selectedFriend: string
) => {
  return response.data.result.map((item: FriendItem) => {
    return (
      <FriendItem
        selected={selectedFriend == item._id}
        item={item}
        disabled={false}
        isRequestMode={false}
        onAccept={() => ""}
        onDelete={deleteMutate}
        onSelect={onFriendItemSelect}
      />
    );
  });
};

const generatePendingFriendRequestsArray = (
  response: ResponseQueryObject,
  acceptMutate: any
) => {
  return response.data.result.map((item: FriendItem) => {
    return (
      <FriendItem
        item={item}
        disabled={true}
        isRequestMode={true}
        onAccept={acceptMutate}
        onDelete={() => ""}
      />
    );
  });
};

const DashboardFriends = () => {
  const [selectedFriend, setSelectedFriend] = useState<string>("");
  const dispatch = useDispatch();
  const { recipientID } = useSelector((state: RootState) => state.global);

  const getFriends = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => {
      return axios.get("/api/user/friends");
    },
    refetchInterval: queryInterval,
  });

  const getFriendRequests = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: () => {
      return axios.get("/api/user/getFriendRequests");
    },
  });

  const acceptRequestMutation = useMutation({
    mutationKey: ["acceptFriendRequest"],
    mutationFn: (id: string) => {
      const data: AcceptRequestDto = {
        id,
      };
      return axios.post("/api/user/friends", data);
    },
    onSuccess: () => {
      console.log("success!");
      getFriends.refetch();
      getFriendRequests.refetch();
    },
    onError: (error) => {
      dispatch(
        setError(
          "Something went fatally wrong while attempting to accept friend request"
        )
      );
    },
  });

  const deleteFriendMutation = useMutation({
    mutationKey: ["deleteFriend"],
    mutationFn: (id: string) => {
      const data: AcceptRequestDto = {
        id,
      };
      return axios.delete(`/api/user/friends/${data.id}`);
    },
    onSuccess: () => {
      console.log("success!");
      getFriends.refetch();
      getFriendRequests.refetch();
    },
    onError: (error) => {
      dispatch(
        setError(
          "Something went fatally wrong while attempting to remove friend"
        )
      );
    },
  });

  const onSearchBarValueChange = (
    data: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const onFriendItemSelect = (item: FriendItem): void => {
    setSelectedFriend(item._id);

    if (recipientID) {
      // If client is already connected to another user, reset that state.
      dispatch(resetRoom());
    }

    // Prepares data for room connection
    dispatch(setRoom({ type: "user", _id: item._id, roomName: item.username }));
    // Tells other hooks to pull current user data
    dispatch(setFetchRoom(true));
  };

  return (
    <div className="hidden md:block bg-white rounded-md py-4 px-3 w-[300px] border-[1px] border-borderGrey">
      {/* Map o  friends list */}
      <SearchBar onChange={onSearchBarValueChange} />

      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold ">Direct Message</p>
        <AddFriend />

      </div>
      <div id="friend-item-container" className="flex flex-col gap-2">
        {getFriends.data?.data
          ? generateFriendsArray(
              getFriends.data,
              deleteFriendMutation.mutate,
              onFriendItemSelect,
              selectedFriend
            )
          : "Ha ha, you have no friends"}
      </div>

      <p className=" font-semibold text-gray-950 mt-10 mb-2">
        Pending Requests
      </p>
      {getFriendRequests.data?.data
        ? generatePendingFriendRequestsArray(
            getFriendRequests.data,
            acceptRequestMutation.mutate
          )
        : "Ha ha, you have no friends"}
    </div>
  );
};

export default DashboardFriends;
