import { raleway, ralewayS } from '@/fonts/Raleway';
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import styles from '@/styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={`${ralewayS.className} ${styles.title}`}>
                creArte
            </div>
            <div className={`${raleway.className} ${styles.options}`}>
                <Link href={"/about"} className={styles.space}>Acerca de creArte</Link>
                <Link href={"/contact"} className={styles.space}>Contacto</Link>
            </div>
            <div className={styles.social}>
                <Link href={"/facebook"} >
                    <FaFacebook className={styles.facebook} /></Link>
                <Link href={"/instagram"}>
                    <FaInstagram className={styles.instagram}/>
                </Link>
            </div>
            <div className={`${styles.copyright} ${raleway.className}`}>
                <p>Todos los derechos reservados. creArte</p>
            </div>
        </div>
    );
};