import "./Card.css";

const Card = ({ name, population, region, capital, flag }) => {
  return (
    <div className="card">
      <img src={flag} alt={`Flag of ${name}`} />
      <h2>{name}</h2>
      <p>
        <strong>Population:</strong>
        {population}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <p>
        <strong>Capital:</strong> {capital}
      </p>
    </div>
  );
};

export default Card;
