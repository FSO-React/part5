const CountryWeather = ({ country, weather }) => {
  if (!weather) {
    return null;
  }
  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    </>
  )
}

export default CountryWeather;