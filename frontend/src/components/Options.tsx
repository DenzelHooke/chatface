import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";

interface Props {
  className: String;
  onDelete?: () => void;
}

interface DotProp {
  state: Boolean;
}

interface PopupProps {
  onFriendDelete: () => void;
}

const Dot = ({ state }: DotProp) => {
  return (
    <div
      className={`w-1.5 h-1.5  rounded-full ${
        state ? "bg-white" : "bg-darkBlack"
      }`}
    ></div>
  );
};

const Popup = ({ onFriendDelete }: PopupProps) => {
  return (
    <div className="absolute w-[152px] h-[147px] border-[1px] border-borderGrey rounded-md bg-white p-2">
      <h3 className="font-bold  mb-6">Options</h3>
      <ul>
        <li
          className="text-darkGrey hover:text-red-600 flex gap-2 items-center"
          onClick={onFriendDelete}
        >
          Remove Friend <FaTrash size={10} />
        </li>
      </ul>
    </div>
  );
};

const Options = ({ className, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconSize = 2;

  const onClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`py-2.5 px-5 rounded-full hover:bg-lightGrey cursor-pointer relative flex space-y-[3px] flex-col items-center ${
        isOpen ? "bg-black hover:bg-lightBlackishPurple" : "bg-none"
      }`}
      onClick={onClick}
    >
      <Dot state={isOpen} />
      <Dot state={isOpen} />
      <Dot state={isOpen} />

      {isOpen && <Popup onFriendDelete={onDelete} />}
      {/* <SlOptions size={25} className="antialiased " /> */}
    </div>
  );
};

export default Options;
