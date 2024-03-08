import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/global/globalSlice";
import FriendItem from "./FriendItem";
import SearchBar from "./Searchbar";
import AddFriend from "./AddFriend";

const DashboardFriends = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["getRooms"],
    queryFn: async () =>
      // Pass user cookie in httpOnly
      axios.post("http://localhost:3000/api/user?friends=all"),
  });

  return (
    <div className="bg-white rounded-md p-5 mr-5 w-[300px]">
      {/* Map over friends list */}
      <SearchBar />
      <AddFriend />
      <FriendItem />
    </div>
  );
};
export default DashboardFriends;
