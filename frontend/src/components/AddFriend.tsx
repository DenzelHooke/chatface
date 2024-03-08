import Button from "./Button";

const AddFriend = () => {
  const onClick = () => {
    console.log("Add Friends Clicked");
  };
  return (
    <button
      className="text-center bg-lightBlue text-white font-normal w-full
    py-1 px-2 rounded-[5px] mb-10"
    >
      Add Friend
    </button>
  );
};
export default AddFriend;
