import ChatBox from "./ChatBox";
import DashboardFriends from "./DashboardFriends";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MainPane = () => {
  const { username } = useSelector((state: RootState) => state.global);

  return (
    <>
      <div
        id="main-pane"
        className="bg-slate-50 min-h-screen flex-grow rounded-md px-10 py-10 grid"
      >
        <div
          id="dashboard-info"
          className="font-bold text-2xl"
        >{`Hello, ${username}.`}</div>

        <div id="dashboard-ui-container" className="flex items-end mt-10 ">
          <div className="container flex flex-grow space-x-5 max-w-full max-h-[800px] min-h-[700px] ">
            <DashboardFriends />
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPane;
