import { Link, useParams } from "react-router-dom";
import { countries } from "../data/TestArray";
import arrowLeftDark from "../assets/arrow-left-dark.svg";
import arrowLeft from "../assets/arrow-left.svg";
import "./CountryPage.css";
import { useEffect } from "react";
import { useState } from "react";

const CountryPage = ({ darkMode }) => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const foundCountry = countries.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    setCountry(foundCountry);
    console.log("Changed country:", name);
  }, [name]);

  console.log("Rendering CountryPage");
  if (!country) {
    return <h2>Country not found</h2>;
  }

  console.log("Current country object:", country);
  return (
    <div className="country-page">
      <div className="country-wrapper">

        <div>
          <Link to="/" className="back-button">
            <img src={darkMode ? arrowLeft : arrowLeftDark} alt="arrow-left" />
            Back
          </Link>
        </div>
        <div className="country-container">
          <div className="flag">
            <img src={country.flag} alt={`Flag of ${country.name}`} />
          </div>

          <div className="country-info">
            <h2>{country.name}</h2>
            <div className="info-columns">
              <div className="left-column">
                <p>
                  <strong>Population:</strong> {country.population}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
                <p>
                  <strong>Native name:</strong> {country.native}
                </p>
              </div>

              <div className="right-column">
                <p>
                  <strong>Top Level Domain:</strong> {country.domain}
                </p>
                <p>
                  <strong>Currencies:</strong> {country.currency}
                </p>
                <p>
                  <strong>Language:</strong> {country.language}
                </p>
              </div>
            </div>

            <div className="border-countries">
              <p>
                <strong>Border Countries:</strong>
              </p>
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((border) => (
                  <Link key={border} to={`/${border}`} className="border-link">
                    {border}
                  </Link>
                ))
              ) : (
                <span>No border countries</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountryPage;
