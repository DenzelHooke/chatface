import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Input from "./Input";
import FormError from "./FormError";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

import {
  setError as setToastError,
  setSuccess,
} from "../../features/global/globalSlice";
import { useDispatch } from "react-redux";

type FormFields = {
  username: string;
  password: string;
};

const passMin = 4;
const passMinLengthOptions = {
  value: passMin,
  message: `Password must have at least ${passMin} characters`,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: FormFields) => {
      return axios.post("http://localhost:3000/api/auth/register", data);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "John Doe",
      password: "1234@",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // Arttificial loading for future loading animation
    await new Promise((resolve, reject) => {
      return setTimeout(resolve, 500);
    });

    try {
      //Data gets converted to object containing our fields rather than a formElement Event object.
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      if (res.data) {
        dispatch(setSuccess("Login Successful"));
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error: any) {
      dispatch(setToastError(error.response.data.message));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <Input
        label="Username"
        name="username"
        placeholder="Username"
        register={register}
        validation={{
          required: "Username required buddy!",
        }}
        error={errors.username}
      />
      {errors.username && <FormError message={errors.username.message} />}

      {/* Validate: Validate allows a function to enable custom input validators. If they validate to true, the form passes, else they validate to false */}

      <Input
        label="Password"
        name="password"
        register={register}
        validation={{
          required: "Password required",
        }}
        placeholder="Password"
        error={errors.password}
      />
      {errors.password && <FormError message={errors.password.message} />}

      <Button disabled={isSubmitting} type="submit" message="Login" />
      {errors.root && <FormError message={errors.root.message} />}
    </form>
  );
};
export default LoginForm;
