import React from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "..";
import searchBarStyle from "./searchBar.module.css";
import { CSS_PROPS_TYPES } from "@/app/types/css";
type SearchBarProps = {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: React.FC<SearchBarProps & CSS_PROPS_TYPES> = ({
  ...props
}) => {
  return (
    <div
      className={`${searchBarStyle.searchContainer} ${
        searchBarStyle[`searchContainer-${props.variant}`]
      }`}
    >
      <FaSearch
        width={25}
        className={`${searchBarStyle.searchIcon} ${
          searchBarStyle[`searchIcon-${props.variant}`]
        }`}
      />
      <Input
        id="search"
        placeholder="Search"
        className={searchBarStyle[`input-${props.variant}`]}
        {...props}
      />
    </div>
  );
};

export default SearchBar;
