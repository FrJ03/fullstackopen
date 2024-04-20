import Header from "./Header"
import List from "./List"
import Message from "./Message"
import WeatherService from '../services/weather'

const CountryDetails = ({country}) => {

    let data = null
    WeatherService.getWeather(country.latlng[0], country.latlng[1])
                    .then(weather => data = weather)

    return (
        <>
            <Header header={country.name.common}/>
            
            <Message message={"capital " + country.capital}/>
            <Message message={"area " + country.area}/>
            <br/>
            <List title={"languages:"} elements={country.languages}/>
            
            <img src={country.flags.svg} width='10%'/>

            <WeatherDetails data={data} country={country.name.common}/>
        </>
    )
}

export default CountryDetails