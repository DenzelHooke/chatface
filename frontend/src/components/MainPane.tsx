import ChatBox from "./ChatBox";
import DashboardFriends from "./DashboardFriends";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const MainPane = () => {
  const { username, roomName } = useSelector(
    (state: RootState) => state.global
  );

  return (
    <>
      <section id="main-pane" className="bg-lightBlackishPurple relative">
        {/* <div                        
          id="dashboard-info"
          className="font-bold text-2xl mb-10"
        >{`Hello, ${username}.`}</div> */}

        <div className="flex flex-grow space-x-2 absolute top-0 left-0 right-0 bottom-0">
          <DashboardFriends />

          {roomName && <ChatBox />}
        </div>
      </section>
    </>
  );
};
export default MainPane;
