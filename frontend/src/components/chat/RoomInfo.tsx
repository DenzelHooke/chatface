const RoomInfo = ({ currentRoom }: { currentRoom: string | null }) => {
  return (
    <>
      <div className="p-5">
        <h2 className="font-bold text-darkBlack text-3xl">{currentRoom}</h2>
        <div id="room-status" className="flex">
          <div className="bg-green-500 w-3 aspect-square rounded-full"></div>
        </div>
      </div>
    </>
  );
};
export default RoomInfo;
