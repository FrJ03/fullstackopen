const SearchBar = ({onChange}) => {
    return (
        <>
            find countries <input type="text" onChange={(event) => onChange(event)}/>
        </>
    )
}

export default SearchBar