import { useEffect, useState } from "react"
import styles from './footer.module.css'

const Footer = () => {
    const [count, setCount] = useState(0)
    
    // Contador de permanencia de tiempo en la página
    useEffect(() => {
    setTimeout(() => {
        {setCount(count + 1) }
    }, 1000)    
    },[count])

    return (
        <div className={styles.footer}>
            Time viewing this page : {count} seconds. <br/>
            <small><i> Developed by lcperri 2024.</i></small>
        </div>
    )
}


export default Footer