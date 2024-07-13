import { useContext, useEffect, useState } from "react"
import { citiesContext } from "../context/citiesContext"
import styles from './search.module.css'

const Search = () => {
    const { getCityByName, cityResult, setCityResult, setLoading } = useContext(citiesContext)
    const [cityName, setCiytName] = useState('')
    const [found, setFound] = useState(true)

    const HandleSubmit = (e) => {
        e.preventDefault()
        setFound(true)
        //Valida si ya existe la ciudad antes de mostrar el resultado:
        if (cityResult.name?.toLowerCase() ===cityName.toLowerCase())
            return

        const promiseCity = getCityByName(cityName)
        Promise.resolve(promiseCity)
        .then(data => {
            setCityResult(data)
        })
        .catch(err => {
            console.log('Error algo pasaaa. ', err)
            setLoading(false)
            setFound(false)
        })
        setCiytName('')
    }
    
    return (
        <div className={styles.search}>
            <form onSubmit={ HandleSubmit }>
                <input type="" name="cityName" value={ cityName } onChange={(e) => setCiytName(e.target.value)} />
                <button type="submit" >Find it!</button>
            </form>
            <p>
                { 
                    cityName !== '' ? 
                        <div>
                            You are looking for { cityName }
                        </div>
                    : <></>      
                }
                {
                    cityName === '' && found === false ?
                        <div>
                            City not found.
                        </div>
                    :<></>
                }
                {
                    cityName.toLowerCase() === cityResult.name?.toLowerCase() ?
                        <div>
                            {cityName} is already showed.
                        </div>
                    :<></>
                }
            </p>
        </div>
    )
}

export default Search