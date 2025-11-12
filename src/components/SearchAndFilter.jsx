import { useState } from "react";
import "./SearchAndFilter.css";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filterValue,
  setFilterValue,
}) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      <select
        name="filter"
        id="filter"
        value={filterValue}
        onChange={handleFilterChange}
      >
        <option value="All">All</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
