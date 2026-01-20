import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import SearchAndFilter from "./components/SearchAndFilter.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryPage from "./components/CountryPage.jsx";
import SkeletonCard from "./components/SkeletonCard.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,borders,tld,currencies,languages,cca3"
        );

        if (!response.ok) {
          throw new Error("Could not fetch countries");
        }

        const data = await response.json();

        const mapped = data.map(country => {
          //native name
          const nativeNameObj = country.name?.nativeName ? Object.values(country.name.nativeName)[0] : null;

          const nativeName = nativeNameObj?.common || "No native name";

          //top level domain
          const tld = country.tld?.[0] || "No TLD";

          //currency
          const currencyObj = country.currencies ? Object.values(country.currencies)[0] : null;

          const currency = currencyObj?.name || "No currency";

          //language(s)
          const language = country.languages ? Object.values(country.languages).join(", ") : "No language";

          return {
            name: country.name?.common || "No name",
            population: country.population || 0,
            region: country.region || "Unknown",
            capital: country.capital?.[0] || "No capital",
            flag: country.flags?.png || "",
            borders: country.borders || [],
            code: country.cca3,
            nativeName, 
            tld,
            currency, 
            language,
            
          };
        });

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
        <ScrollToTop />
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
                    {loading
                      ? Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonCard key={index} />
                      ))
                    : filteredCountries.map((country) => (
                          <Card
                            key={country.code}
                            name={country.name}
                            population={country.population.toLocaleString()}
                            region={country.region}
                            capital={country.capital}
                            flag={country.flag}
                            code={country.code}
                          />
                        ))
                    }
                  </div>
                </div>
              }
            />
            <Route
              path="/country/:code"
              element={<CountryPage darkMode={darkMode} countries={countriesData} loading={loading}/>}
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
