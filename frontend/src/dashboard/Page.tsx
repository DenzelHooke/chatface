import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/global/globalSlice";

import Sidebar from "../components/Sidebar";
import MainPane from "../components/MainPane";

const Page = () => {
  const dispatch = useDispatch();

  // const { data, isLoading, isError, isSuccess, refetch } = useQuery({
  //   queryKey: ["getRooms"],
  //   queryFn: async () => axios.post("http://localhost:3000/api/auth/verify"),
  // });

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(setError(""));
  //     return;
  //   }

  //   dispatch(setSuccess(""));
  // }, [isError, isSuccess]);

  return (
    <section className="bg-blackishPurple min-h-screen">
      <div id="inner-container" className="flex p-4 h-screen">
        <Sidebar />

        <div className="flex h-full flex-grow items-center justify-center">
          <MainPane />
        </div>
      </div>
      {/* <DashboardFriends /> */}
    </section>
  );
};

export default Page;
