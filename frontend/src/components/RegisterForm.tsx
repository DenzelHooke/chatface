import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"

type FormData = {
  email: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post('http://localhost:3000/api/auth/register', {test: "Test"})
    }
  })

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password1: '',
    password2: ''
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: any) => {
    // e.preventDefault();
    console.log("MUTATE CALLED")
    setFormData(data)
    const x = mutation.mutate(formData)
    console.log(x)
    console.log(formData)

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
