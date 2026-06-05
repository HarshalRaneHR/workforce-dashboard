import { FiSearch, FiX } from "react-icons/fi";
import type { SearchBarProps } from "../types";
import "./css/SearchBar.css";

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search">
      <FiSearch size={16} aria-hidden />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search people, roles, skills…"
        aria-label="Search"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <FiX size={14} aria-hidden />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
