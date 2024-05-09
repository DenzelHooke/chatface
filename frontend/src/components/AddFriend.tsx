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
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => setModalOpen(false)}
          className="absolute right-0 top-0 m-2 p-2 px-4 rounded-lg z-50 hover:bg-slate-50 bg-white border border-borderGrey font-bold "
        >
          Close
        </button>
        {<AddFriendModal />}
      </Modal>

      <button
        className="text-center hover:bg-lighterDeepBrightBlue bg-deepBrightBlue text-sm text-white font-medium w-full
      py-1 px-2 rounded-[5px] mb-10"
        onClick={onClick}
      >
        Add Friends
      </button>
    </>
  );
};
export default AddFriend;
