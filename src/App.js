import React, {useEffect, useState, useContext} from 'react';
import WeatherList from './components/WeatherList';
import WeatherCard from './components/WeatherCard';
import Header from './components/Header';
import { citiesContext } from './context/citiesContext';
import Footer from './components/Footer';
import styles from './App.module.css'


function App() {
  const [count, setCount] = useState(0)
  const { loading, setLoading, cityResult, setCityResult, cities, setCities, getCityByCoords, getCityByName, pinnedCities,setPinnedCities, showedCardDetails, setShowedCardDetails } = useContext(citiesContext)
  const [lat, setLat] = useState()
  const [long, setLong] = useState()

  //Persistencia. Al actualizar la página recupera las ids de las ciuadades gaurdadas desde el LS:
  useEffect(() => {
    const recoveryCitiesFromLS =  async () => {
      const LS = localStorage.getItem('SavedCities')
      if (LS) {
          const savedCitiesArray = JSON.parse(LS)
          const citiesPromise = savedCitiesArray.map(cityName => getCityByName(cityName))
          try {
            const citiesData =  await Promise.all(citiesPromise)
            setCities(citiesData)
            //Pineamos las ciudades guardadas:            
            const cityIDs = citiesData.map(city => city.id)
            setPinnedCities(cityIDs)
          } catch(err){
            console.log('Hubo un error al obtener los datos. ', err)
          }
      }
    }
    recoveryCitiesFromLS()
  }, [])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude)
      setLong (position.coords.longitude)
    })

    if (lat && long !== undefined) {
      setLoading(true)
      Promise.resolve(getCityByCoords(lat, long))
      .then((cityResult) => setCityResult(cityResult))
      .catch(err => console.log(err))

      setShowedCardDetails([...showedCardDetails, cityResult.id])
    }
  }, [lat, long])

  return (
    <div className={styles.wrapper}>
      <header>
        <Header/>
        <div className=""><h3><i> Welcome user lat {lat} long {long}</i></h3> </div>
      </header>
      <main>
        {/* Sección resultado de búsqueda: */}
        <section>
          {loading === true ? (
            <div className='text-6xl'>
              Loading...
            </div> 
          ) : (
            cityResult?.id ? 
              <WeatherCard 
                key = {cityResult.id}
                city = {cityResult}
                pinned = {pinnedCities.includes(cityResult.id)} 
                showedCardDetails={showedCardDetails.includes(cityResult.id)}
                hasCloseButton = {true}
                withDetailsByDefect = {true}
              /> 
              : '' 
            
          )}
        </section>

        {/* Sección de listas de cards guardadas: */}
        <section>
          { loading === true ? (
            <div className='text-6xl'>
              Loading...
            </div> 
            ) : (
            <>
              <WeatherList cities={ cities }/>
            </> )
          }
        </section>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App;