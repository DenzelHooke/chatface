import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/global/globalSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ToastWatcher = () => {
  const dispatch = useDispatch();
  const { error, errorMessage, success, successMessage } = useSelector(
    (state: any) => state.global
  );

  useEffect(() => {
    if (error) {
      toast.error(`${errorMessage}`);
    }

    if (success) {
      toast.success(`${successMessage}`);
    }

    dispatch(reset());
  }, [error, success]);
  return <div></div>;
};
export default ToastWatcher;
