import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"

type FormFields = {
  username: string;
  password1: string;
  password2: string;
};

const RegisterForm = () => {
  const mutation = useMutation({
    mutationFn: (data: FormFields) => {
      return axios.post('http://localhost:3000/api/auth/register', data)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    //Data gets converted to object containing our fields rather than a formElement Event object. 
    console.log(data)
  }
  
  // HandleSubmit checks if our fields are all valid and prevents default behaviour of form submit. 


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Username required" , })}
        placeholder="Username"
        type="text"
        name="username"
      />
      { errors.username && <div>{errors.username.message}</div> }

      <input {...register("password1", { required: "Password required", minLength: 8, validate: (string) => string.includes('@') })} placeholder="Password" type="text"
      name="password1"/>
      { errors.password1 && <div>{errors.password1.message}</div> }

      <input
        {...register("password2", { required: "Please confirm password", minLength: 8 })}
        placeholder="Confirm Password"
        type="text"
        name="password2"
        />
        { errors.password2 && <div>{errors.password2.message}</div> }

      <input type="submit" />
    </form>
  );
};
export default RegisterForm;
