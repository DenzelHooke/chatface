import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
  deleteMutate: any
) => {
  return response.data.result.map((item: FriendItem) => {
    return (
      <FriendItem
        item={item}
        disabled={false}
        isRequestMode={false}
        onAccept={() => ""}
        onDelete={deleteMutate}
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
  const dispatch = useDispatch();

  const getFriends = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => {
      return axios.get("http://localhost:3000/api/user/friends");
    },
    refetchInterval: queryInterval,
  });

  const getFriendRequests = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: () => {
      return axios.get("http://localhost:3000/api/user/getFriendRequests");
    },
  });

  const acceptRequestMutation = useMutation({
    mutationKey: ["acceptFriendRequest"],
    mutationFn: (id: string) => {
      const data: AcceptRequestDto = {
        id,
      };
      return axios.post("http://localhost:3000/api/user/friends", data);
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
      return axios.delete(`http://localhost:3000/api/user/friends/${data.id}`);
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

  return (
    <div className="hidden md:block bg-white rounded-md p-5 mr-5 w-[300px] border-[1px] border-borderGrey">
      {/* Map o  friends list */}
      <SearchBar onChange={onSearchBarValueChange} />
      <AddFriend />

      <p className="font-bold text-blue-500">Friends</p>
      {getFriends.data?.data
        ? generateFriendsArray(getFriends.data, deleteFriendMutation.mutate)
        : "Ha ha, you have no friends"}

      <p className="font-bold text-green-500">Pending Requests</p>
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
