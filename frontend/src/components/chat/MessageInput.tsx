import { ChangeEventHandler } from "react";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormFields {
  message: string;
}

export const MessageInput = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmitForm: SubmitHandler<FormFields> = async (data: FormFields) => {
    reset();
    onSubmit(data.message);
  };

  return (
    <div className="h-[85px]">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Input
          label=""
          name="message"
          placeholder="Say something nice.."
          register={register}
          validation={{
            required: "Must enter a message before sending!",
          }}
          error={errors.message}
        />
        <button
          type="submit"
          className="bg-lighterDeepBrightBlue text-white py-1 px-4 rounded-md mt-2"
        >
          Send message
        </button>
        <div>{errors.message && errors.message.message}</div>
      </form>
    </div>
  );
};
