import { Link, useParams } from "react-router-dom";
import arrowLeftDark from "../assets/arrow-left-dark.svg";
import arrowLeft from "../assets/arrow-left.svg";
import "./CountryPage.css";

const CountryPage = ({ darkMode, countries }) => {
  const { code } = useParams(); // <-- vi tar emot country code istället för name

  // Hitta landet baserat på dess 3-bokstavskod (cca3)
  const country = countries.find(c => c.code === code);

  if (!country) {
    return <h2>Country not found</h2>;
  }

  // Hitta grannländer genom att matcha deras codes mot countries-listan
  const borderCountries = country.borders
    .map(borderCode => countries.find(c => c.code === borderCode))
    .filter(Boolean);

  return (
    <div className="country-page">
      <div className="country-wrapper">

        {/* BACK BUTTON */}
        <div>
          <Link to="/" className="back-button">
            <img src={darkMode ? arrowLeft : arrowLeftDark} alt="arrow-left" />
            Back
          </Link>
        </div>

        <div className="country-container">
          
          {/* FLAG */}
          <div className="flag">
            <img src={country.flag} alt={`Flag of ${country.name}`} />
          </div>

          {/* INFO */}
          <div className="country-info">
            <h2>{country.name}</h2>

            <div className="info-columns">
              <div className="left-column">
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Native name:</strong> {country.nativeName}</p>
              </div>

              <div className="right-column">
                <p><strong>Top Level Domain:</strong> {country.tld}</p>
                <p><strong>Currencies:</strong> {country.currency}</p>
                <p><strong>Language:</strong> {country.language}</p>
              </div>
            </div>

            {/* BORDER COUNTRIES */}
            <div className="border-countries">
              <p><strong>Border Countries:</strong></p>

              {borderCountries.length > 0 ? (
                borderCountries.map(border => (
                  <Link
                    key={border.code}
                    to={`/${border.code}`}
                    className="border-link"
                  >
                    {border.name}
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