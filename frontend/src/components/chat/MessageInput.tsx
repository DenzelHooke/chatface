import { ChangeEventHandler } from "react";

export const MessageInput = () => {
  const onChange = (event: ChangeEventHandler<HTMLInputElement>) => {};

  return (
    <div className="h-[85px] bg-red-500">
      <input type="text" onChange={onChange} />
    </div>
  );
};
