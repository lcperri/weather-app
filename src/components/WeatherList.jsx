import { useContext } from 'react'
import { citiesContext } from '../context/citiesContext'
import WeatherCard from './WeatherCard'
import styles from './weatherList.module.css'

const WeatherList = ({ cities }) => {
    const { pinnedCities, showedCardDetails } = useContext(citiesContext)

    return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Your saved weathers:
                </div>
                <div className={styles.weatherList}>
                    { cities.map(city => {
                        return (  
                            <WeatherCard 
                                key = {city.id} 
                                city = { city } 
                                // Aqui el resultado será true o false si es que la card tiene el id en el array de pineados:
                                pinned = {pinnedCities.includes(city.id)}
                                showedCardDetails = {showedCardDetails.includes(city.id)}
                            />
                        )
                    })}
                </div>
            </div>                     
    )
}

export default WeatherList