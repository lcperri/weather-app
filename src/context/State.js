import { useEffect, useState } from "react"
import { citiesContext } from "./citiesContext"

const State = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [cityResult, setCityResult] = useState({})
    const [pinnedCities, setPinnedCities] = useState([])
    const [cities, setCities] = useState([])
    const [showedCardDetails, setShowedCardDetails] = useState([])

    const addCity = (city) => {
        //SUGERENCIA DE CHATGPT BUENA PRACTICA USAR ESTADO PREVIO:
        // setCities(prevCities => {
        //     if (!prevCities.some(c => c.id === city.id)) {
        //         return [city, ...prevCities];
        //     }
        // });
        setCities([city, ...cities])
    }

    //Guardamos el id de la ciudad en local Storage:
    const saveCityToLS = (cityName) => {
        const cityNames = cities.map(city => city.name)
        cityNames.push(cityName)
        localStorage.setItem('SavedCities', JSON.stringify(cityNames))
    }

    const removeCityFromLS = (cityName) => {
        let cityNames = cities.map(city => city.name)
        cityNames = cityNames.filter(name => name !== cityName)
        localStorage.setItem('SavedCities', JSON.stringify(cityNames))
    }

    const removeCity = (id) =>{
        if (cityResult.id===id) setCityResult({})
    }

    //Control de Cards pineadas:
    const onHandlePin = (city) => {        
        setPinnedCities(prevPinnedCities => {
            if (prevPinnedCities.includes(city.id)) {
                removeCityFromLS(city.name)
                //Quita ciudad de la lista de ciudaddes:
                setCities(prevCities => {
                    return prevCities.filter(c => c.id !== city.id)
                })
                //Quita pin del array de cards pineadas
                return prevPinnedCities.filter(id => id !== city.id)

            } else {
                addCity(city)
                saveCityToLS(city.name)//a local storage
                setCityResult({})
                setShowedCardDetails(prevShowedDetails => {
                    return prevShowedDetails.filter(id => id !== city.id)
                })
                return [...prevPinnedCities, city.id]
            }
        })         
    }

    const toggleCardDetail = (city) => {
        setShowedCardDetails(prevShowedDetails => {
            if (prevShowedDetails.includes(city.id)) {
                return prevShowedDetails.filter(id => id !== city.id)
            } else {
                return [...prevShowedDetails, city.id]
            }
        })
    }
    
    //FUNCIONES DE LLAMADA A LA API:
    const getCityByCoords =  async (lat, long) => {    
        let dataCity = {}
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            dataCity = {
                id: data.id,
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                clouds: data.clouds.all,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                country: data.sys.country,
                icon: data.weather[0].icon,
                description: data.weather[0].description,
                wind: data.wind.speed
            }
        })
        .catch(err => { 
            setLoading(false)
            return err
        })
        const cityForecast = await getCityForecast(dataCity.name)
        setLoading(false)
        return { ...dataCity, ...cityForecast }
    }
    
    //Llamada a la api buscando por nombre:
    const getCityByName = async (cityName) => {
        let cityData = {}
        await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            return res.status !== 200 ? 
                Promise.reject(`City not found. ${res}`)
            :
            res.json()
            .then(data => {
                cityData = {
                    id: data.id,
                    name: data.name,
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                    clouds: data.clouds.all,
                    feels_like: data.main.feels_like,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                    country: data.sys.country,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    wind: data.wind.speed    
                }
            })
        })
        setLoading(false)
        const cityForecast = await getCityForecast(cityName)
        return cityData = {...cityData, ...cityForecast}
    }
    
    //Llamada a la api forecast para obtener detalles adicionales del clima de la ciudad:
    const getCityForecast = (cityName) => { 
        return new Promise((resolve, reject) => {
            fetch (`${process.env.REACT_APP_API_URL}/forecast?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                resolve({
                    population : data.city.population !== 0 ? data.city.population : 'unavailable info',
                    sunrise: data.city.sunrise,
                    sunset: data.city.sunset,
                    list: data.list
                })
            })
            .catch(err => reject(err))
        })
    }

    return (
        <citiesContext.Provider
            value={{
                cityResult,
                setCityResult,
                cities, 
                setCities,
                addCity,
                removeCity,
                getCityByCoords,
                getCityByName,
                pinnedCities,
                setPinnedCities,
                onHandlePin,
                showedCardDetails,
                setShowedCardDetails,
                toggleCardDetail,
                loading,
                setLoading,
            }}
        >
            { children }
        </citiesContext.Provider>
    )
}

export default State