import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { raleway, ralewayPrd } from "@/fonts/Raleway";
import styles from "@/styles/Cart.module.css"
import Link from "next/link";

export default function Cart({products}) {
    return (
        <div>
            <Header />
            <main className={styles.mainContainer}>
                {/* Este caso será solo cuando el carrito esté vacío*/}
                <div className={styles.adviceContainer}>
                    <p className={`${styles.advCart} ${ralewayPrd.className}`}>Carrito de compra</p>
                    <p className={`${styles.advNothing} ${raleway.className}`}>No has agregado nada a tu carrito.</p>
                    <Link href={"/"} className={`${styles.advButton} ${ralewayPrd.className}`}>Seguir explorando</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}