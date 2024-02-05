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
        // This would be message passed from server
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
            message: " Password must have at least 8 characters",
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
