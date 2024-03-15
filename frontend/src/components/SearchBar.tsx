import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useState } from "react";

type FormFields = {
  searchField: string;
};

type PropData = {
  onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ onChange }: PropData) => {
  return (
    <div id="searchBar">
      <input
        type="text"
        placeholder="John Doe"
        className="bg-lightGrey text-darkGrey border-borderGrey border-solid border-[1px] rounded-md placeholder:text-darkGrey w-full mb-5 py-1 px-3"
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
export default SearchBar;
