import { useState, useEffect } from 'react';
import services from './services/Countrydata';
import Filter from './components/Filter';
import ShowCountry from './components/Countries';

const App = () => {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountry] = useState([]);

  const handleCountries = (event) => {
    setCountryName(event.target.value);
  };

  useEffect(() => {
    services
      .getAll()
      .then(data => {
        setCountry(data);
      });
  }, []);
  
  return (
    <>
      <Filter
        text="find countries"
        value={countryName}
        handler={handleCountries} />
      
      <ShowCountry countries={countries} countryName={countryName} />
    </>
  );
};

export default App;
