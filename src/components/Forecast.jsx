import styles from './forecast.module.css'
import unixToDate from "../functions"

const Forecast = ({hourForecast}) => {
    const now = new Date()
    const today = now.toLocaleDateString().slice(0,1)
    return (
        <div className={styles.forecast}>
            <div>
                { today === unixToDate(hourForecast.dt)[0] ?
                    'today' 
                    : 
                    `day ${unixToDate(hourForecast.dt)[0]}`
                    
                }
                
                <br/>
                at {unixToDate(hourForecast.dt)[1]}h
            </div>
            <div>
                <img width={62} src={`${process.env.REACT_APP_ICON_URL}/${hourForecast.weather[0].icon}@2x.png`} alt=""/>
            </div>
            <div>
                {(hourForecast.main.temp)}°C
            </div>
        </div>
    )
}

export default Forecast