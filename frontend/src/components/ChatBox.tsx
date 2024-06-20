import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
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

  const socketRef = useRef<Socket | null>(null);
  const socketInitialized = useRef(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [friendIsTyping, setFriendIsTyping] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<any>();

  const onSubmit = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit("chatMessage", { message });
    }
  };

  const startTypingTimeout = () => {
    const timeout = setTimeout(() => setFriendIsTyping(false), 2000);
    setTypingTimeout(timeout);
  };

  useEffect(() => {
    if (isTyping && socketRef.current) {
      socketRef.current.emit("isTyping", { userID });
      setIsTyping(false);
    }
  }, [isTyping, socketRef]);

  useEffect(() => {
    if (fetchRoom) {
      // Resets socket to false if a new room is currently getting fetched.
      socketInitialized.current = false;

      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    }

    if (fetchRoom && !socketInitialized.current) {
      // Initialize socket connection to server
      socketRef.current = io(SERVER_URL, {
        reconnectionDelayMax: 10000,
        query: {
          recipient: recipientID,
        },
        auth: {
          token: Cookies.get("token"),
        },
      });

      socketRef.current.on("error", (error: any) => {
        console.error("WebSocket connection error:", error);
      });

      socketRef.current.on("disconnect", () => {});

      socketRef.current.on("chatMessage", (data: MessageData) => {
        console.log("New message ", data);
        setMessages((prevState) => [...prevState, data]);
      });

      // Set user ID and pull current messages for recipient ID.
      socketRef.current.on(
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

      // Set socket init to True.
      socketInitialized.current = true;
      dispatch(setFetchRoom(false));
    }
  }, [fetchRoom]);

  useEffect(() => {
    // Disconnect socket on component dismount
    return () => {
      if (socketRef.current && socketInitialized.current) {
        console.log("disconnected socket");
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("isTyping", () => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setFriendIsTyping(true);
        startTypingTimeout();
      });
    }
  }, [isTyping]);

  //! Client is being reinitialized on every re-render must fix!
  // const client = useRTCClient(
  //   //@ts-ignore
  //   AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  // );

  const onMessageInput = () => {
    setIsTyping(true);
  };

  return (
    <div className="bg-white flex-grow max-w-6xl border-[1px] border-borderGrey rounded-md grid grid-cols-1 gap-0 grid-rows-[80px_1fr_85px]">
      <RoomInfo currentRoom={roomName} />
      {/* <AgoraRTCProvider client={client}>
        <VideoChat appID={APP_ID} channelName={channelName} client={client} />
      </AgoraRTCProvider> */}
      <Messages messages={messages} userID={userID} />
      {/* <div>{friendIsTyping && "User is typing"}</div>  */}

      {socketRef.current ? (
        <MessageInput onSubmit={onSubmit} onChange={onMessageInput} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatBox;
