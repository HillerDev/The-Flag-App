import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { countries } from "./data/TestArray.js";
import SearchAndFilter from "./components/SearchAndFilter.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryPage from "./components/CountryPage.jsx";


function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      filterValue === "All" || country.region === filterValue;

    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesRegion && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme}  />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
          <div className="wrapper">
            <div className="search-and-filter">
              <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
              />
            </div>
            <div className="card-container">
              {filteredCountries.map((country) => (
                <Card
                  key={country.name}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  flag={country.flag}
                />
              ))}
            </div>
          </div>
              }
              />
              <Route path="/:name" element={<CountryPage darkMode={darkMode} />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
