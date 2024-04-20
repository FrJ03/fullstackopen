import Header from "./Header"
import List from "./List"
import Message from "./Message"

const CountryDetails = ({country}) => {
    return (
        <>
            <Header header={country.name.common}/>
            
            <Message message={"capital " + country.capital}/>
            <Message message={"area " + country.area}/>
            <br/>
            <List title={"languages:"} elements={country.languages}/>
            
            <img src={country.flags.svg} width='10%'/>
        </>
    )
}

export default CountryDetails