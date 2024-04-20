import Button from './Button'

const CountryListElement = ({element, onClick}) => {
    return (
        <div>
            {element} <button onClick={(event) => onClick(event, element)}>show</button>
        </div>
    )
}

export default CountryListElement