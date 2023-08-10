import styles from './Header.module.css';
import Rocket from '../assets/rocket.svg';

export function Header(){
    return(
        <header className={styles.header}>
            <img src={Rocket} alt="Icone de um foguete, simbolizando o nome da empresa." />
            <span>to<strong>do</strong></span>
        </header>
    );
}