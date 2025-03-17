import { useState, useEffect } from "react";
import weather from "../services/Weather";

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weather
    .getAll(country.capital)
    .then(weather => {
      setWeatherData(weather)
    })
  }, [country.capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h2>Weather in {country.capital}</h2>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp} celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
          <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        null
      )}

    </div>
  );
};

const ShowCountry = ({ countries, countryName }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null);
  }, [countryName]);


  const filteredCountries = countryName
  ? countries.filter((item) =>
      item.name.common.toLowerCase().includes(countryName.toLowerCase())
    )
  : [];

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }

  return (
    <>
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        filteredCountries.map((item) => (
            <p key={item.name.common}>{item.name.common}
              <button onClick={() => handleShow(item)}>Show</button>
            </p>
        ))
      )}
    </>
  );
};

export default ShowCountry;
