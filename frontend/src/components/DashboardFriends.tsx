import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/global/globalSlice";
import FriendItem from "./FriendItem";
import SearchBar from "./Searchbar";
import AddFriend from "./AddFriend";

interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const DashboardFriends = () => {
  const getFriends = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => {
      return axios.get("http://localhost:3000/api/user/friends");
    },
  });

  const getFriendRequests = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: () => {
      return axios.get("http://localhost:3000/api/user/getFriendRequests");
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

      <p>Friends</p>
      {/* {getFriends.data?.data.friends.map((id: string) => {})} */}
      <p>Requested Recieved</p>
      {getFriendRequests.data?.data.map((item: FriendItem) => {
        return <FriendItem item={item} />;
      })}
    </div>
  );
};
export default DashboardFriends;
