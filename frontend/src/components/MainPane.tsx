import ChatBox from "./ChatBox";
import DashboardFriends from "./DashboardFriends";

const MainPane = () => {
  return (
    <div
      id="main-pane"
      className="bg-slate-50 max-w-screen-xl flex-grow h-full rounded-md p-5"
    >
      <div className="container flex flex-grow space-x-5 max-w-full max-h-[800px] min-h-[700px] mt-10">
        <DashboardFriends />
        <ChatBox />
      </div>
    </div>
  );
};
export default MainPane;
