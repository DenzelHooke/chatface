import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import { UseDispatch, useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/global/globalSlice";
import FriendItem from "./FriendItem";
import SearchBar from "./Searchbar";
import AddFriend from "./AddFriend";
import { ResponseQueryObject, AcceptRequestDto } from "../types/types";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}
const queryInterval = 5 * 1000;

const generateFriendsArray = (
  response: ResponseQueryObject,
  deleteMutate: any,
  onFriendItemSelect: (id: string) => void,
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

  const onFriendItemSelect = (id: string): void => {
    setSelectedFriend(id);
  };

  return (
    <div className="hidden md:block bg-white rounded-md py-4 px-3 w-[300px] border-[1px] border-borderGrey">
      {/* Map o  friends list */}
      <SearchBar onChange={onSearchBarValueChange} />
      <AddFriend />

      <p className="font-bold text-black mb-2">Friends</p>
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

      <p className="font-bold text-black mt-10 mb-2">Pending Requests</p>
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
