import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"

type FormData = {
  username: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post('http://localhost:3000/api/auth/register', formData)
    }
  })

  const [formData, setFormData] = useState<FormData>({
    username: 'JohnDoe',
    password1: '123',
    password2: '123'
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: any) => {
    // e.preventDefault();
    console.log("MUTATE CALLED")
    mutation.mutate(formData)
  };
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...(register("username"), { required: true, maxLength: 99 })}
        placeholder="Username"
        type="text"
        value={formData.username}
        name="username"
        onChange={onChange}
      />
      {errors.username && <span>This is required</span>}
      <input {...register("password1")} placeholder="Password" type="text"
      name="password1" value={formData.password1}
      onChange={onChange}/>
      <input
        {...register("password2")}
        placeholder="Confirm Password"
        type="text"
        name="password2"
        value={formData.password2}
        onChange={onChange}
      />
      <input type="submit" />
    </form>
  );
};
export default RegisterForm;
