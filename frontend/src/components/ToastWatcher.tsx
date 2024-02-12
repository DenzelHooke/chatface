import  { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../features/global/globalSlice'; 
import { useEffect } from 'react';
import { toast } from "react-toastify"



const ToastWatcher = () => {
  const { error, success } = useSelector((state: any) => state.global)

  useEffect(() => {
    if(error) {
      toast.error(`Error: ${error}`)
    }

    if(success) {
      toast.success(`Success: ${success}`)
    }

    reset()

  }, [error, success])
  return <div></div>;
};
export default ToastWatcher;
