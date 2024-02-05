type PropTypes = {
  message: string;
  disabled: boolean;
  type: "submit" | "reset" | "button" | undefined;
};

const Button = ({ message, disabled, type }: PropTypes) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="text-white py-2 px-4 rounded-md bg-deepBrightBlue hover:bg-lighterDeepBrightBlue"
    >
      {disabled ? "Loading" : message}
    </button>
  );
};
export default Button;
