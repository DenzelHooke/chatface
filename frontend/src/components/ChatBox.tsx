import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import RoomInfo from "./chat/RoomInfo";
import { MessageInput } from "./chat/MessageInput";
import Messages from "./chat/Messages";
import { io, Socket } from "socket.io-client";
import { setFetchRoom } from "../../features/global/globalSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { MessageData } from "../types/types";
import { start } from "repl";

const SERVER_URL = import.meta.env.VITE_SERVER;

interface RoomData {
  type: "single";
}

// const initRoom = async (id: string) => {
//   return await axios.post("http://localhost:3000/api/room/init", {
//     recipient: id,
//   });
// };

const ChatBox = () => {
  const { roomName, fetchRoom, recipientID } = useSelector(
    (state: RootState) => state.global
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  const dispatch = useDispatch();
  const [submitMessage, setSubmitMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState<Boolean>(false);
  const [friendIsTyping, setFriendIsTyping] = useState<Boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<any>();

  const onSubmit = (message: string) => {
    setSubmitMessage(true);
    setMessage(message);
  };

  const startTypingTimeout = () => {
    const timeout = setTimeout(() => setFriendIsTyping(false), 2000);
    setTypingTimeout(timeout);
  };
  useEffect(() => {
    if (submitMessage && socket) {
      // console.log(message);
      socket.emit("chatMessage", { message: message });
      setMessage("");
      setSubmitMessage(false);
    }
  }, [submitMessage]);

  useEffect(() => {
    if (isTyping && socket) {
      socket.emit("isTyping", {
        userID: userID,
      });
      setIsTyping(false);
    }
  }, [isTyping, socket]);

  useEffect(() => {
    setTimeout;
  }, [friendIsTyping]);
  useEffect(() => {
    if (fetchRoom) {
      // TODO Fetch room data

      if (!roomName || !recipientID) {
        console.error("No roomname found!");
        return;
      }

      // initRoom(recipientID);

      // TODO Initiate websocket connection

      const newSocket = io(SERVER_URL, {
        reconnectionDelayMax: 10000,
        query: {
          recipient: recipientID,
        },
        auth: {
          token: Cookies.get("token"),
        },
      });

      // Handle connection errors
      newSocket.on("error", (error: any) => {
        console.error("WebSocket connection error:", error);
      });

      // Handle disconnection
      newSocket.on("disconnect", () => {
        console.log("WebSocket disconnected");
      });

      newSocket.on("chatMessage", (data: MessageData) => {
        setMessages((prevState) => [...prevState, data]);
      });

      newSocket.on("init", (data: { userID: string }) => {
        setUserID(data.userID);
      });

      newSocket.on("isTyping", (data: { userID: string }) => {
        console.log("typing..");

        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setFriendIsTyping(true);
        startTypingTimeout();
      });

      setSocket(newSocket);

      dispatch(setFetchRoom(false));
    }
    // TODO Set up web socket listeners
  }, [roomName, fetchRoom]);

  const onMessageInput = () => {
    setIsTyping(true);
  };

  return (
    <div className="bg-white flex-grow max-w-full border-[1px] border-borderGrey p-5 rounded-md grid grid-cols-1 gap-0 grid-rows-[80px_1fr_85px]">
      <RoomInfo currentRoom={roomName} />

      <Messages messages={messages} userID={userID} />
      <div>{friendIsTyping && "User is typing"}</div>
      <MessageInput onSubmit={onSubmit} onChange={onMessageInput} />
    </div>
  );
};
export default ChatBox;
