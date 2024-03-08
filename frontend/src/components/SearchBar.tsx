import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

type FormFields = {
  searchField: string;
};

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div id="searchBar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="John Doe"
          {...register("searchField")}
        />
      </form>
    </div>
  );
};
export default SearchBar;
