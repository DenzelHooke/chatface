import DeleteFriend from "./DeleteFriend";
import Options from "../Options";
const RoomInfo = ({ currentRoom }: { currentRoom: string | null }) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-3xl font-light">{currentRoom}</h2>
          <div className="bg-green-500 w-3 h-3 mr-1 aspect-square rounded-full"></div>
        </div>
        <Options className="ml-auto" />
      </div>
    </div>
  );
};

export default RoomInfo;
