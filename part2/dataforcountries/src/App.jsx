import { useState, useEffect } from 'react'
import Message from './components/Message'
import SearchBar from './components/SearchBar'
import CountryView from './components/CountryView'
import CountriesService from './services/countries'

function App() {
  const toManyCountriesMsg = "Too many matches, specify another filter"
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountriesService.search(filter).then(countries => setCountries(countries))
  }, [filter])

  const SearchHandler = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  return (
    <>
      <SearchBar onChange={SearchHandler}/>
      {countries.length <= 10 ? 
        <CountryView countries={countries}/>
        :
        <Message message={toManyCountriesMsg}/>
      }
    </>
  )
}

export default App
