import { useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import MainPane from "../components/MainPane";

const Page = () => {
  return (
    <section className="bg-blackishPurple min-h-screen">
      <div id="inner-container" className="flex p-5 min-h-screen items-center">
        <Sidebar />

        <div className="flex h-full flex-grow items-center justify-center ">
          <MainPane />
        </div>
      </div>
      {/* <DashboardFriends /> */}
    </section>
  );
};

export default Page;
