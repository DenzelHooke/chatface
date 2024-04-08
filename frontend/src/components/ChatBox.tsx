import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import RoomInfo from "./chat/RoomInfo";
import { MessageInput } from "./chat/MessageInput";
import Messages from "./chat/Messages";
import { io } from "socket.io-client";
import { setFetchRoom } from "../../features/global/globalSlice";
import axios from "axios";

interface RoomData {
  type: "single";
}

const initRoom = async (id: string) => {
  return await axios.post("http://localhost:3000/api/room/init", {
    recipient: id,
  });
};

const ChatBox = () => {
  const { roomName, fetchRoom, recipientID } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();
  let socket;

  useEffect(() => {
    if (fetchRoom) {
      // TODO Fetch room data

      if (!roomName || !recipientID) {
        console.error("No roomname found!");
        return;
      }

      initRoom(recipientID);
      // Create room ID if not created already

      // TODO Initiate websocket connection

      socket = io("http://localhost:3000", {
        reconnectionDelayMax: 10000,
        auth: {
          token: "123",
        },
      });

      // Handle connection errors
      socket.on("error", (error) => {
        console.error("WebSocket connection error:", error);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
      });

      dispatch(setFetchRoom(false));
    }
    // TODO Set up web socket listeners
  }, [roomName, fetchRoom]);

  return (
    <div className="bg-white flex-grow max-w-full border-[1px] border-borderGrey p-5 rounded-md grid grid-cols-1 gap-0 grid-rows-[80px_1fr_85px]">
      <RoomInfo currentRoom={roomName} />

      <Messages />

      <MessageInput />
    </div>
  );
};
export default ChatBox;
