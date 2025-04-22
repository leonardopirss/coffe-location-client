import { CardI } from "../Interface/interface";
import styles from '../styles/Card.module.css';
import image from "../images/WhatsApp-Image-2024-11-12-at-13.57.20.jpeg"

export function Card({ name, adress, uf, municipality, assessment, description }: CardI) {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} />
            <div>
                <h2>{name}</h2>
                <p>Endereço: {adress}</p>
                <p>Estado: {uf}</p>
                <p>Cidade: {municipality}</p>
                <p>Descrição: {description}</p>
                <p>Avaliação: {assessment}</p>
            </div>
        </div>
    );
}