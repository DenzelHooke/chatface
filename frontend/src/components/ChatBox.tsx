import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { MessageData } from "../types/types";
import { setFetchRoom } from "../../features/global/globalSlice";
import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";

import RoomInfo from "./chat/RoomInfo";
import Messages from "./chat/Messages";
import { MessageInput } from "./chat/MessageInput";
import VideoChat from "./video/VideoChat";

const SERVER_URL = import.meta.env.VITE_SERVER;
const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

const ChatBox = () => {
  const { roomName, fetchRoom, recipientID } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [friendIsTyping, setFriendIsTyping] = useState<boolean>(false);
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
      socket.emit("chatMessage", { message });
      setMessage("");
      setSubmitMessage(false);
    }
  }, [submitMessage, socket]);

  useEffect(() => {
    if (isTyping && socket) {
      socket.emit("isTyping", { userID });
      setIsTyping(false);
    }
  }, [isTyping, socket, userID]);

  useEffect(() => {
    if (fetchRoom && roomName && recipientID) {
      const newSocket = io(SERVER_URL, {
        reconnectionDelayMax: 10000,
        query: {
          recipient: recipientID,
        },
        auth: {
          token: Cookies.get("token"),
        },
      });

      newSocket.on("error", (error: any) => {
        console.error("WebSocket connection error:", error);
      });

      newSocket.on("disconnect", () => {});

      newSocket.on("chatMessage", (data: MessageData) => {
        setMessages((prevState) => [...prevState, data]);
      });

      newSocket.on(
        "init",
        (data: { userID: string; messages: MessageData[] }) => {
          setUserID(data.userID);
          const formattedData = data.messages.map(
            ({ userID, message, username }) => ({
              userID,
              message,
              username,
            })
          );
          setMessages(formattedData);
        }
      );

      newSocket.on("isTyping", () => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setFriendIsTyping(true);
        startTypingTimeout();
      });

      setSocket(newSocket);
      dispatch(setFetchRoom(false));
    }
  }, [fetchRoom, roomName, recipientID, dispatch, typingTimeout]);

  const client = useRTCClient(
    //@ts-ignore
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  const [channelName, setChannelName] = useState<string>("testChannel");

  const onMessageInput = () => {
    setIsTyping(true);
  };

  return (
    <div className="bg-white flex-grow max-w-full border-[1px] border-borderGrey p-5 rounded-md grid grid-cols-1 gap-0 grid-rows-[80px_1fr_85px]">
      <RoomInfo currentRoom={roomName} />
      <AgoraRTCProvider client={client}>
        <VideoChat appID={APP_ID} channelName={channelName} client={client} />
      </AgoraRTCProvider>
      <Messages messages={messages} userID={userID} />
      <div>{friendIsTyping && "User is typing"}</div>
      <MessageInput onSubmit={onSubmit} onChange={onMessageInput} />
    </div>
  );
};

export default ChatBox;
