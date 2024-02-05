type PropTypes = {
  message: string | undefined;
};

const FormError = ({ message }: PropTypes) => {
  return <div className="text-red-600">{message}</div>;
};
export default FormError;
