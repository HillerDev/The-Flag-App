import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ name, population, region, capital, flag }) => {
  return (
    <Link to={`/${name}`} className="card-link">
      <div className="card">
        <img src={flag} alt={`Flag of ${name}`} />
        <h2>{name}</h2>
        <p>
          <strong>Population: </strong>
          {population}
        </p>
        <p>
          <strong>Region: </strong>
          {region}
        </p>
        <p>
          <strong>Capital: </strong>
          {capital}
        </p>
      </div>
    </Link>
  );
};

export default Card;
