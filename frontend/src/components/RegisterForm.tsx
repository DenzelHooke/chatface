import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "../config/axiosConfig";
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
  email: string;
  password1: string;
  password2: string;
};

const passMin = 4;
const passMinLengthOptions = {
  value: passMin,
  message: `Password must have at least ${passMin} characters`,
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: FormFields) => {
      return axios.post("/api/auth/register", data);
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
      email: "mail@mail.com",
      password1: "1234@",
      password2: "1234@",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.password1 !== data.password2) {
      setError("password2", {
        message: "Passwords do not match!",
      });

      return;
    }

    // Arttificial loading for future loading animation
    await new Promise((resolve, reject) => {
      return setTimeout(resolve, 500);
    });

    try {
      //Data gets converted to object containing our fields rather than a formElement Event object.
      const res = await axios.post("/api/auth/register", data);

      if (res.status === 200 && res.data) {
        dispatch(setSuccess("Account Created Succesfully"));
        setTimeout(() => navigate("/login"), 500);
      }
    } catch (error: any) {
      dispatch(setToastError(error.response.data.message));
    }
  };

  // HandleSubmit checks if our fields are all valid and prevents default behaviour of form submit.

  const passwordCheck = (string: string) => {
    if (!string.includes("@")) {
      return 'Password must contain "@"';
    }

    return true;
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

      <Input
        label="Email"
        name="email"
        placeholder="Email"
        register={register}
        validation={{
          required: "Email required",
        }}
        error={errors.email}
      />
      {errors.email && <FormError message={errors.email.message} />}

      {/* Validate: Validate allows a function to enable custom input validators. If they validate to true, the form passes, else they validate to false */}

      <Input
        label="Password"
        name="password1"
        register={register}
        validation={{
          required: "Password required",
          minLength: passMinLengthOptions,
        }}
        placeholder="Password"
        error={errors.password1}
      />
      {errors.password1 && <FormError message={errors.password1.message} />}

      <Input
        label="Confirm Password"
        name="password2"
        register={register}
        validation={{
          required: "Please confirm password",
          minLength: passMinLengthOptions,
        }}
        error={errors.password2}
        placeholder="Confirm Password"
        type="password"
      />
      {errors.password2 && <FormError message={errors.password2.message} />}

      <Button disabled={isSubmitting} type="submit" message="Create Account" />
      {errors.root && <FormError message={errors.root.message} />}
    </form>
  );
};
export default RegisterForm;
