import { useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import MainPane from "../components/MainPane";

const Page = () => {
  return (
    <section className="bg-blackishPurple relative min-h-screen flex items-center">
      <div className="flex grow">
        <div id="inner-container" className="flex p-5 items-center flex-grow">
          <Sidebar />
          <div className="flex flex-grow items-center justify-center">
            <MainPane />
          </div>
        </div>
      </div>
      {/* <DashboardFriends /> */}
    </section>
  );
};

export default Page;
