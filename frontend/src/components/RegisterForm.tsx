import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = () => {
    // e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...(register("email"), { required: true, maxLength: 99 })}
        placeholder="Email"
        type="text"
      />
      {errors.email && <span>This is required</span>}
      <input {...register("password1")} placeholder="Password" type="text" />
      <input
        {...register("password2")}
        placeholder="Confirm Password"
        type="text"
      />
      <input type="submit" />
    </form>
  );
};
export default RegisterForm;
