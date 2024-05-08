import ChatBox from "./ChatBox";
import DashboardFriends from "./DashboardFriends";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MainPane = () => {
  const { username } = useSelector((state: RootState) => state.global);

  return (
    <>
      <section
        id="main-pane"
        className="bg-slate-50 flex-grow rounded-md p-8 grid"
      >
        <div
          id="dashboard-info"
          className="font-bold text-2xl mb-10"
        >{`Hello, ${username}.`}</div>

        <div id="dashboard-ui-container" className="flex items-stretch">
          <div className="container flex flex-grow space-x-5 max-w-full h-[800px]">
            <DashboardFriends />
            <ChatBox />
          </div>
        </div>
      </section>
    </>
  );
};
export default MainPane;
