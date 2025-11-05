import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card';
import { countries } from './data/TestArray.js';

function App() {
  return (
    <>
    <Navbar />
      <main className="main-content">
        <div className="card-container">
          {countries.map((country) => (
          <Card
            name = {country.name}
            population = {country.population}
            region = {country.region}
            capital= {country.capital}
            flag ={country.flag} />
          ))}
        </div>
      </main>
    </>
  );
}



export default App;
