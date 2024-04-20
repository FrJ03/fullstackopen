import { useState, useEffect } from 'react'
import Message from './components/Message'
import SearchBar from './components/SearchBar'
import CountryView from './components/CountryView'
import CountriesService from './services/countries'
import CountryDetails from './components/CountryDetails'

function App() {
  const toManyCountriesMsg = "Too many matches, specify another filter"
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    CountriesService.search(filter).then(countries => setCountries(countries))
  }, [filter])

  const searchHandler = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    setFilter(newFilter)
    setSelected(null)
  }

  const selectHandler = (event, name) => {
    event.preventDefault()
    CountriesService.findByName(name)
                      .then(country => setSelected(country))
    
  }

  return (
    <>
      <SearchBar onChange={searchHandler}/>
      {countries.length <= 10 ?
        selected !== null ? 
          <CountryDetails country={selected}/>
          :
          <CountryView countries={countries} onClick={selectHandler}/>
        :
        <Message message={toManyCountriesMsg}/>
      }
    </>
  )
}

export default App
