const Messages = ({ messages }: { messages: Array<string> }) => {
  return (
    <div className="row-span-2">{messages.map((item) => `${item}\n`)}</div>
  );
};
export default Messages;
