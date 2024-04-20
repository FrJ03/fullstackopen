import Message from './Message'

const CountryList = ({countries}) => {
    return (
        <>
            {countries.map((country, key) => <Message key={country.name.common +  key} message={country.name.common}/>)}
        </>
    )
}

export default CountryList