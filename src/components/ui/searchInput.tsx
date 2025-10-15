"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search market",
}) => {
  return (
    <div
      className="
        flex items-center gap-2
        w-full max-w-xs px-3 py-2
        text-sm text-gray-200
        bg-[#2A3946] border-solid border-[1px] border-[rgba(255,255,255,0.8)]
        rounded-md
        focus-within:ring-1 focus-within:ring-teal-500
        transition
      "
    >
      <FaSearch size={16} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 bg-transparent outline-none
          placeholder-gray-400 text-gray-200
        "
      />
    </div>
  );
};

export default SearchInput;
