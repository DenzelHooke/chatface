interface FriendItem {
  username: string;
  profilePicture: string;
  _id: string;
}

const FriendItem = ({ item }: { item: FriendItem }) => {
  return (
    <div className="p-1 flex space-x-2 shadow-lg rounded-sm">
      <img
        src={item.profilePicture}
        alt="Profile picture"
        className="w-[62px] h-[65px] rounded-sm"
      />
      <p className="font-medium text-md">{item.username}</p>
    </div>
  );
};
export default FriendItem;
