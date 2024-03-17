import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import DisplayFoundUsers from "./DisplayFoundUsers";
import { toast } from "react-toastify";
import { setSuccess } from "../../features/global/globalSlice";
import { useDispatch } from "react-redux";

// Sets credentials globally
axios.defaults.withCredentials = true;

const AddFriendModal = () => {
  const dispatch = useDispatch()

  // Send post request with search value
  const { isSuccess, isError, isPending, data, mutate } = useMutation({
    mutationFn: async (value: string) => {
      // HttpOnly cookie is sent automatically with request
      return await axios.post("http://localhost:3000/api/user/findFriends", {
        username: value,
      });
      // Returns array with all users found matching name
    },
    onSuccess: () => {
      //TODO SHOW SUCCESS MESSAGE
    },
  });


  // Display users

  // Add actions attached to each user
  const onValueChange = async (data: React.ChangeEvent<HTMLInputElement>) => {
    const value = data.target.value;

    //TODO Call endpoint
    mutate(value);

    //TODO Set return array as state
  };

  return (
    <div id="add-friend-modal" className="w-[510px] h-[610px] relative">
      <div className="inner-modal-container">
        <div id="add-friend-heading-container" className="">
          <h2 className="font-bold text-center text-4xl mb-10 pt-2">
            Add Friends
          </h2>
        </div>
        <SearchBar onChange={onValueChange} />

        <div id="add-friend-results" className="mt-10">
          <DisplayFoundUsers
            data={data?.data.result}
            isSuccess={isSuccess}
            isLoading={isPending}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
};
export default AddFriendModal;
