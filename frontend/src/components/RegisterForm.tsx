import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Input from "./Input";
import FormError from "./FormError";
import Button from "./Button";

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "JohnDoe",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.password1 !== data.password2) {
      setError("password2", {
        message: "Passwords do not match!",
      });

      return;
    }

    await new Promise((resolve, reject) => {
      return setTimeout(resolve, 500);
    });

    try {
      //Data gets converted to object containing our fields rather than a formElement Event object.
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );
    } catch (error) {
      setError("root", {
        // This would be message passed from server
        message: "",
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <Input
        label="Username"
        name="username"
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
        name="password1"
        register={register}
        validation={{
          required: "Password required",
          validate: (string: string) => passwordCheck(string),
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
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
          validate: (string: string) => passwordCheck(string),
          minLength: {
            value: 8,
            message: " Password must have at least 8 characters",
          },
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
