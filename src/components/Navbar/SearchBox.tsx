import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

// This component renders a search box with an input field and a search button
// It allows users to enter a search query and submit it
type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function Searchbox(props: Props) {
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        value={props.value}
        onChange={props.onChange}
        type="text"
        placeholder="Search.."
        className="px-4 py-2 w-[230px] border  rounded-l-md focus:outline-none focus:border-blue-500 h-full text-foreground"
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full"
        name="search"
      >
        <IoSearch />
      </button>
    </form>
  );
}
