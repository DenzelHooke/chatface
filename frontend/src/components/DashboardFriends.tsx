import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/global/globalSlice";
import FriendItem from "./FriendItem";
import SearchBar from "./Searchbar";
import AddFriend from "./AddFriend";

const DashboardFriends = () => {
  const getFriends = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => {
      return axios.get("localhost:3000/api/user/friends");
    },
    retry: 1,
  });

  const onSearchBarValueChange = (
    data: React.ChangeEvent<HTMLInputElement>
  ) => {};

  return (
    <div className="hidden md:block bg-white rounded-md p-5 mr-5 w-[300px] border-[1px] border-borderGrey">
      {/* Map o  friends list */}
      <SearchBar onChange={onSearchBarValueChange} />
      <AddFriend />
      <FriendItem />

      <p>Friends</p>
      {/* {getFriends.data?.data.friends.map((id: string) => {})} */}
      <p>Requests</p>
      <p>Requested Recieved</p>
    </div>
  );
};
export default DashboardFriends;
