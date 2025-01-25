import weatherService from '../services/weather'
import { useState, useEffect } from 'react'
import CountryWeather from './CountryWeather'

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)
  
  const fetchWeather = async () => {
    const body = {
      lat: country.latlng[0],
      lon: country.latlng[1],
      capital: country.capital,
      apiKey: import.meta.env.VITE_OPEN_WEATHER_API 
    }
    await weatherService.getOne(body)
      .then(({ data }) => {
        console.log('weather', data)
        setWeather(data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, [country])

  return (
    <>
      <h1>{country.name.common}</h1>
      
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, lang]) => <li key={key}>{lang}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <CountryWeather country={country} weather={weather}></CountryWeather>
    </>
  )
}

export default Country;