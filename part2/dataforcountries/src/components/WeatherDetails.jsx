const WeatherDetails = ({data, country}) => {
    return (
        <div>
            <h2>Weather in {country}</h2>
            <div>
                temperature {data.main.temp - 273.15} Celcius
            </div> 
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} width='10%'/>
            <div>
                wind {data.wind.speed} m/s
            </div>
        </div>
    )
}

export default WeatherDetails