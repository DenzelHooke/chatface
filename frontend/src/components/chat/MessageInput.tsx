import { ChangeEventHandler, useEffect } from "react";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";

interface FormFields {
  message: string;
}

export const MessageInput = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (data: any) => void;
  onChange: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const message = watch("message");

  // Runs when user types into message field
  useEffect(() => {
    if (message) {
      onChange();
    }
  }, [message]);

  const onSubmitForm: SubmitHandler<FormFields> = async (data: FormFields) => {
    reset();
    onSubmit(data.message);
  };

  return (
    <div className="h-[85px] bg-lightGrey flex items-center">
      <form onSubmit={handleSubmit(onSubmitForm)} className="flex-grow">
        <div
          id="input-message-wrapper"
          className="flex items-center px-4 gap-2"
        >
          <div className="flex-grow">
            <input
              autoComplete="off"
              className="block w-full bg-lightGrey focus:outline-none focus:border-lightGrey"
              type="text"
              name="message"
              placeholder="Enter message"
              {...register("message", {
                required: "Message field must not be empty.",
              })}
            />
            <div className="text-red-500 font-bold">
              {errors.message && `${errors.message.message}`}
            </div>
          </div>
          <button
            type="submit"
            className="bg-deepBrightBlue hover:bg-lighterDeepBrightBlue text-white py-2 px-4 rounded-md flex justify-center items-center gap-2"
          >
            Send <IoMdSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
