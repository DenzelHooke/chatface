interface PropData {
  body: string;
  name: string;
  profile: string;
  isSender: boolean;
}

const Message = ({ body, name, profile, isSender }: PropData) => {
  return (
    <div id="messageContainer" className={`${isSender && "justify-end"} flex `}>
      <div>
        <div id="profilePictureMessage"></div>
        <div id="bodyMessage">
          <div
            id="messageInfo"
            className={` ${
              isSender ? "bg-blue-600 text-white font-medium" : "bg-gray-200"
            } p-2 my-2 rounded-md`}
          >
            <p>{body}</p>

            {/* <div>Timestamp</div> */}
          </div>
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
};
export default Message;
