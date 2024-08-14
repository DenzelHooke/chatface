import Button from "./Button";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AddFriendModal from "./AddFriendModal";
import { IoAddCircleSharp } from "react-icons/io5";

import { FaPlus } from "react-icons/fa";

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
      <Modal isOpen={isModalOpen} style={customStyles} contentLabel="">
        <button
          onClick={() => setModalOpen(false)}
          className="absolute right-0 top-0 m-2 p-2 px-4 rounded-lg z-50 hover:bg-slate-50 bg-white border border-borderGrey font-bold "
        >
          Close
        </button>
        {<AddFriendModal />}
      </Modal>

      <FaPlus
        size={20}
        className="hover:fill-darkGrey cursor-pointe"
        onClick={onClick}
      />
    </>
  );
};
export default AddFriend;
