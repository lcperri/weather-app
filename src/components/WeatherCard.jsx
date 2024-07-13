import { useContext, useState } from 'react'
import { citiesContext } from "../context/citiesContext"
import Forecast from './Forecast'

import pinnedImg from '../imgs/pinned.png'
import unpinnedImg from '../imgs/unpinned.png'
import moreBtn from '../imgs/more-btn.png'
import lessBtn from '../imgs/less-btn.png'
import styles from './weatherCard.module.css'

export default function WeatherCard ({ city, pinned, showedCardDetails, hasCloseButton, withDetailsByDefect }) {
    const { removeCity, onHandlePin, toggleCardDetail } = useContext(citiesContext)
    return (
        <div className={styles.weatherCard}>
            <div className={styles.cardHeader} >
                <div className='pinContainer' 
                    onClick={()=> onHandlePin(city)}
                >
                    <img width={24} src={pinned ? pinnedImg : unpinnedImg} alt=""  />
                </div>
                {
                    hasCloseButton ? 
                        <div className={styles.closeBtn} onClick={() => removeCity(city.id)}>x</div>
                        :
                        <></>
                }
            </div>
            <div className={styles.cardPresentation}>                
                <span><h1>{city.name},  {city.country}</h1> </span> 
                <span>{city.description}</span>
            </div>
            <div className={styles.imgCard}>
                <img width={90} src={`${process.env.REACT_APP_ICON_URL}/${city.icon}@2x.png`} alt=""/>
            </div>
            <div className={styles.cardDescription}>
                <span>feels like:<b> {city.feels_like}°</b> </span>
                <span>wind:<b> {city.wind} m/s</b> </span>
                <span>humidity:<b> {city.humidity} %</b> </span>                
                <span>population:<b> {city.population} </b> </span>
                {/* <span>pressure:<b> {city.pressure} hPa</b> </span> */}
            </div>
            <div className={styles.tempDetails}>
                <div className='text-xl'>
                    <b> {city.temp} °C</b>
                </div> 
                <span>
                    <b><small> 
                        {city.temp_min}°C / {city.temp_max}°C
                    </small></b> 
                </span>
            </div>

            {/* Si showedCardDetails es falso no muestra icono para desplegar detalles. */}
            {/* Si mostrar detalles por defecto es falso y showedcarddetails es true entonces muestra icono desplegable: */}
            {!withDetailsByDefect && !showedCardDetails ? (
                <div className={styles.showDetails} onClick={() => toggleCardDetail(city)}>
                    <div className={styles.btnMoreLessDetails}>
                        <img width={12} src={moreBtn} alt="" />
                    </div>
                </div>
                ) : <p/>
            } 
            { withDetailsByDefect ? 
                <div className={`${styles.forecastContainer} ${styles.show}`}>
                    { city.list?.slice(0,8).map(hour => {
                        return ( 
                            <Forecast key={hour.id} hourForecast={hour} />
                        )})
                    }
                </div>
                : 
                <div className={`${styles.forecastContainer} ${showedCardDetails ? styles.show : ''}`}>
                    { city.list?.slice(0,8).map(hour => {
                        return ( 
                            <Forecast key={hour.id} hourForecast={hour} />
                        )})
                    }
                </div>
            }
            
            {!withDetailsByDefect && showedCardDetails && (
                <div className={styles.showDetails} onClick={() => toggleCardDetail(city)}>
                    <div className={styles.btnMoreLessDetails}> 
                        <img width={12} src={lessBtn} alt="" />
                    </div>
                </div>
            )}
        </div>                
    ) 
}
