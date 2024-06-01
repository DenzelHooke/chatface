import DeleteFriend from "./DeleteFriend";

const RoomInfo = ({ currentRoom }: { currentRoom: string | null }) => {
  return (
    <div className="p-5">
      <div className="flex items-center">
        <h2 className="font-bold text-darkBlack text-3xl">{currentRoom}</h2>
        <div className="bg-green-500 w-3 h-3 mr-1 aspect-square rounded-full"></div>

        <DeleteFriend />
      </div>
    </div>
  );
};

export default RoomInfo;
