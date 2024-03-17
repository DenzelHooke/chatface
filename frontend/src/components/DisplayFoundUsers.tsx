import { DisplayFriendsItem } from "../types/users";

import { useState } from "react";
import AddFriendItem from "./AddFriendItem";

const DisplayFoundUsers = ({
  data,
  isSuccess,
  isLoading,
  isError,
}: {
  data: DisplayFriendsItem[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <p></p>;
  }

  if (isSuccess && data?.length > 0) {
    return data.map((item: DisplayFriendsItem) => (
      <>
        <AddFriendItem item={item} />
      </>
    ));
  }

  if (data && data?.length < 1) {
    return <p>No results found</p>;
  }
};
export default DisplayFoundUsers;
