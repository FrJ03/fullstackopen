import CountryListElement from "./CountryListElement"


const CountryList = ({countries, onClick}) => {
    return (
        <>
            {countries.map((country, key) => 
                        <CountryListElement key={country.name.common +  key} element={country.name.common} onClick={onClick}/>               
                )}
        </>
    )
}

export default CountryList