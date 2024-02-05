import { FieldError } from "react-hook-form";

type propTypes = {
  label: string;
  name: string;
  register: any;
  validation: {};
  placeholder?: string;
  type?: string;
  error: FieldError | undefined;
};

const Input = ({
  register,
  name,
  label,
  validation,
  error,
  ...props
}: propTypes) => {
  console.log(props);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={label} className="text-white capitalize mb-2">
          {label}
        </label>
        <input
          {...props}
          {...register(name, validation)}
          className={`bg-lightBlackishPurple text-white py-2 px-4 rounded-md border-[1px] border-white/5 my-0 focus:outline-none focus:ring-1 focus:deepBrightBlue ${
            error && "border-red-700 focus:ring-red-700"
          }`}
        />
      </div>
    </>
  );
};
export default Input;
