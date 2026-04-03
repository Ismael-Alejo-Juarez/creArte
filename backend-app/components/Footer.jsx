import { raleway, ralewayS } from '@/fonts/Raleway';
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={`${ralewayS.className} ${styles.title}`}>
            creArte
        </div>
        <div className={`${raleway.className} ${styles.options}`}>
            <p>Acerca de</p>
            <p>Contacto</p>
        </div>
        <div className={styles.social}>
            <FaFacebook className={styles.facebook}/>
            <FaInstagram />
        </div>
        <div className={`${styles.copyright} ${raleway.className}`}>
            <p>Todos los derechos reservados. creArte</p>
        </div>
    </div>
  );
};