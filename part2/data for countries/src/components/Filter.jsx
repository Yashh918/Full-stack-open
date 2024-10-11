import axios from "axios"
import { useEffect, useState } from "react"
const baseUrl = `https://studies.cs.helsinki.fi/restcountries`

const Filter = ({ search, data, setData, one, setOne }) => {

    const [celcius, setCelcius] = useState(true)

    const fetchCountries = async () => {
        const response = await axios.get(`${baseUrl}/api/all`)
        const countries = response.data
            .map(country => country.name.common)
            .filter(country => country.toLowerCase().includes(search.toLowerCase()))
        return countries

    }

    const fetchWeatherData = async (capital) => {
        const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_REACT_APP_WEATHER_API}&q=${capital}`
        const weatherResponse = await axios.get(weatherUrl);
        return weatherResponse.data.current;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countries = await fetchCountries()
                setData(countries)

                if (countries.length === 1) {
                    const countryResponse = await axios.get(`${baseUrl}/api/name/${countries[0]}`)
                    const countryData = countryResponse.data

                    const weatherData = await fetchWeatherData(countryData.capital);
                    setOne({
                        name: countryData.name.common,
                        capital: countryData.capital,
                        area: countryData.area,
                        languages: countryData.languages,
                        flags: countryData.flags.png,
                        temp_c: weatherData.temp_c,
                        temp_f: weatherData.temp_f,
                        condition_text: weatherData.condition.text,
                        condition_icon: weatherData.condition.icon,
                    })
                } else {
                    setOne(null)
                }
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData()
    }, [search])

    const onShow = async (country) => {
        const countryResponse = await axios.get(`${baseUrl}/api/name/${country}`)
        const countryData = countryResponse.data

        const weatherData = await fetchWeatherData(countryData.capital);
        setOne({
            name: countryData.name.common,
            capital: countryData.capital,
            area: countryData.area,
            languages: countryData.languages,
            flags: countryData.flags.png,
            temp_c: weatherData.temp_c,
            temp_f: weatherData.temp_f,
            condition_text: weatherData.condition.text,
            condition_icon: weatherData.condition.icon,
        })
    }

    return (
        one ? (
            <div>
                <h1>{one.name}</h1>
                <div>capital: {one.capital}</div>
                <div>area: {one.area}</div>

                <h2>Languages</h2>
                {Object.values(one.languages).map((lang =>
                    <div key={lang}>
                        {lang}
                    </div>
                ))}
                <img src={one.flags} alt="flag" />

                <h2>Weather</h2>
                <img src={one.condition_icon} alt="icon" />
                <div>
                    Temperature: {celcius ? `${one.temp_c} °C` : `${one.temp_f} °F`}{" "}
                    <button onClick={() => setCelcius((prev) => !prev)}>
                        Show in {celcius ? "Fahrenheit" : "Celsius"}
                    </button>
                </div>
                <div>condition: {one.condition_text}</div>

            </div>
        ) : data.length > 10 ? (
            <div>
                Too many matches, specify another filter
            </div>
        ) : (
            data.map((country) => (
                <div key={country}>
                    {country}
                    <button onClick={() => onShow(country)}>show</button>
                </div>
            ))
        )



    )
}

export default Filter