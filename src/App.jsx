import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import SearchAndFilter from "./components/SearchAndFilter.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryPage from "./components/CountryPage.jsx";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,borders"
        );

        if (!response.ok) {
          throw new Error("Could not fetch countries");
        }

        const data = await response.json();

        const mapped = data.map((country) => ({
          name: country.name?.common || "No name",
          population: country.population || 0,
          region: country.region || "Unknown",
          capital: country.capital?.[0] || "No capital",
          flag: country.flags?.png || "",
          borders: country.borders || [],
        }));

        setCountriesData(mapped);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const filteredCountries = countriesData.filter((country) => {
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
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
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
            <Route
              path="/:name"
              element={<CountryPage darkMode={darkMode} />}
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
