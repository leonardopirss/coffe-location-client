import styles from '../styles/Header.module.css';
import image from "../images/coffe.png"


export function Header() {

    return (
        <header>
            <div className={styles.container}>
                <img src={image} alt="" />
                <h1 className={styles.h1}>Deskafeinado</h1>
            </div>
        </header>
    )
}