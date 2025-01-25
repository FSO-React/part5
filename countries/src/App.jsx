import service from './services/countries'
import { useState, useEffect } from 'react'

import Input from './components/Input'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [ selectedCountry, setSelectedCountry ] = useState(null)


  const fetchCountries = async () => {
    await service.getAll()
      .then(({ data }) => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    setSelectedCountry(null)
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <Input text='find countries ' value={filterName} onChange={handleFilterChange}></Input>
      <Countries countries={countries} filter={filterName} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}></Countries>
    </div>
  )
}

export default App;