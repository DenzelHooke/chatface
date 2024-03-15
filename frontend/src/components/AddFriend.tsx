import Button from "./Button";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AddFriendModal from "./AddFriendModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddFriend = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const onClick = () => {
    setModalOpen(true);

    console.log("Add Friends Clicked");
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {<AddFriendModal />}
      </Modal>

      <button
        className="text-center hover:bg-lightBlue bg-lighterBlue text-white font-normal w-full
      py-1 px-2 rounded-[5px] mb-10"
        onClick={onClick}
      >
        Add Friend
      </button>
    </>
  );
};
export default AddFriend;
