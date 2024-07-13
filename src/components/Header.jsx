import Search from "./Search"
import styles from './header.module.css'

const Header = () => {
    return (
        <>
            <div className={`${styles.icelandRegular} ${styles.header} `}>
                <div>
                    <h1>Weather </h1>    
                </div>
                <div style={{color: 'white'}}>
                    <h1>&nbsp;app</h1>
                </div>
            </div>
                
            <div style={{color:'white',size: '40px'}}>
                <h2>Just enter the name of a city: <br/> 
                    <small>(while there are still climates in the world)</small>
                </h2>
            </div>
            <Search/>
        </>
    )
}

export default Header