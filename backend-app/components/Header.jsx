import styles from '@/styles/Header.module.css';
import { raleway, ralewayS } from '@/fonts/Raleway';
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu"
import Link from 'next/link';
import { useRouter } from 'next/router';
// ¿Header cambia si el usuario es vendedor?
// Probablemente lo mejor sea que cambie o se agregue algo
// en la parte de configuración
export default function Header() {
    const router = useRouter();
    return (
        <header className={styles.header}>
            <div className={`${styles.sections} ${raleway.className}`}>
                <Link
                    key="/"
                    href="/"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/' ? styles.active : ''}
                        ${styles.scTienda}
                        `}
                >Tienda</Link>
                <Link
                    key="/contact"
                    href="/contact"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/contact' ? styles.active : ''}
                        `}
                >Contacto</Link>
                <Link
                    key="/about"
                    href="/about"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/about' ? styles.active : ''}
                        `}
                >Acerca de creArte</Link>
            </div>
            <div className={`${styles.title} ${ralewayS.className}`}>
                <Link href="/" className={styles.links}>
                    <h1>creArte</h1>
                </Link>
            </div>
            <div className={`${styles.options} ${raleway.className}`}>
                <Link
                    href={"/sign-in"}
                    className={`
                        ${styles.links} 
                        ${router.pathname === '/sign-in' || router.pathname === '/sign-up' ?
                            styles.active : ''}`}
                >Iniciar sesión</Link>
                <div className={styles.social}>
                    <Link
                        href="/facebook"
                        className={styles.links}>
                        <FaFacebook />
                    </Link>
                    <Link
                        href="/instagram"
                        className={styles.links}>
                        <FaInstagram />
                    </Link>
                </div>
                <Link
                    href={"/cart"}
                    className={`${styles.links} ${styles.cart}`}>
                    <LuShoppingCart />
                </Link>
            </div>
        </header>
    );
}