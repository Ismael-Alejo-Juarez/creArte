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
                        `}
                >Tienda</Link>
                <Link
                    key="/catalogo"
                    href="/catalogo"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/catalogo' ? styles.active : ''}
                        `}
                >Catálogo</Link>
                <Link
                    key="/acercade"
                    href="/acercade"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/acercade' ? styles.active : ''}
                        `}
                >Acerca de</Link>
                <Link
                    key="/contacto"
                    href="/contacto"
                    className={`
                        ${styles.links}
                        ${router.pathname === '/contacto' ? styles.active : ''}
                        `}
                >Contacto</Link>
            </div>
            <div className={`${styles.title} ${ralewayS.className}`}>
                <Link href="/" className={styles.links}>
                    <h1>creArte</h1>
                </Link>
            </div>
            <div className={`${styles.options} ${raleway.className}`}>
                <Link
                    href="/"
                    className={styles.links}
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
                    href="/carrito"
                    className={`${styles.links} ${styles.cart}`}>
                    <LuShoppingCart />
                </Link>
            </div>
        </header>
    );
}