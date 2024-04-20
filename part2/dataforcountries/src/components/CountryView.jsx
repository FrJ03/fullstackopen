import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

const CountryView = ({countries, onClick}) => {
    return (
        <>
            {countries.length === 1 ?
                <CountryDetails country={countries[0]}/>
                :
                <CountryList countries={countries} onClick={onClick}/>
            }
        </>
    )
}

export default CountryView