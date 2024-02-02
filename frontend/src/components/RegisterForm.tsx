import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type FormFields = {
  username: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
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
      username: "JohnDoe",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      //Data gets converted to object containing our fields rather than a formElement Event object.
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(data);
      throw new Error();
    } catch {
      setError("root", {
        message: "This username is already taken",
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Username required" })}
        placeholder="Username"
        type="text"
        name="username"
      />
      {errors.username && <div>{errors.username.message}</div>}

      {/* Validate: Validate allows a function to enable custom input validators. If they validate to true, the form passes, else they validate to false */}
      <input
        {...register("password1", {
          required: "Password required",
          validate: (string) => passwordCheck(string),
          minLength: {
            value: 8,
            message: " Password must have at least 8 characters",
          },
        })}
        placeholder="Password"
        type="text"
        name="password1"
      />
      {errors.password1 && <div>{errors.password1.message}</div>}

      <input
        {...register("password2", {
          required: "Please confirm password",
          validate: (string) => passwordCheck(string),
          minLength: {
            value: 8,
            message: " Password must have at least 8 characters",
          },
        })}
        placeholder="Confirm Password"
        type="text"
        name="password2"
      />
      {errors.password2 && <div>{errors.password2.message}</div>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "LOADING" : "Submit"}
      </button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
};
export default RegisterForm;
