const RoomInfo = ({ currentRoom }: { currentRoom: string | null }) => {
  return (
    <>
      <div>
        <h2 className="font-bold text-darkBlack text-lg">{currentRoom}</h2>
      </div>
    </>
  );
};
export default RoomInfo;
