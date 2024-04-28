import { useEffect } from "react";
import Message from "./Message";
import { MessageData } from "../../types/types";

const Messages = ({
  messages,
  userID,
}: {
  messages: MessageData[];
  userID: string | null;
}) => {
  return (
    <div className="row-span-2 max-h-full flex-1 overflow-auto">
      <>
        {messages.map((item) => (
          <Message
            body={item.message}
            name={item.username}
            profile="D"
            isSender={item.userID === userID}
          />
        ))}
      </>
    </div>
  );
};
export default Messages;
