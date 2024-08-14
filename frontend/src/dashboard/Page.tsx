import { useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import MainPane from "../components/MainPane";
import Navbar from "../components/navbar";

const Page = () => {
  return (
    <section
      id="main-container"
      className=" relative min-h-[1000px] grid grid-cols-1 grid-rows-[80px_1fr]"
    >
      <Navbar />
      <MainPane />
      {/* <DashboardFriends /> */}
    </section>
  );
};

export default Page;
