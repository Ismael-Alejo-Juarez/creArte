import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { raleway, ralewayPrd, ralewayS } from "@/fonts/Raleway";
import { HiMinus, HiPlus } from "react-icons/hi";
import { roboto } from "@/fonts/Roboto";
import styles from "@/styles/Cart.module.css"
import Link from "next/link";

export default function Cart({ products }) {
    const cart = [{}];
    return (
        <div>
            <Header />
            <main className={styles.mainContainer}>
                {cart.length == 0 ? (
                    /* Este caso será solo cuando el carrito esté vacío*/
                    <div className={styles.adviceContainer}>
                        <p className={`${styles.advCart} ${ralewayPrd.className}`}>Carrito de compra</p>
                        <p className={`${styles.advNothing} ${raleway.className}`}>No has agregado nada a tu carrito.</p>
                        <Link href={"/"} className={`${styles.advButton} ${ralewayPrd.className}`}>Seguir explorando</Link>
                    </div>
                ) : (
                    /* En caso que si haya productos */
                    <div className={styles.fullContainer}>
                        <h1 className={ralewayS.className}>Carrito de compras</h1>
                        <div className={styles.cartContainer}>
                            {/* PRODUCTO */}
                            <div className={styles.listProducts}>
                                <div className={styles.dvProduct}>
                                    <div className={styles.prdGeneral}>
                                        <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200&auto=format&fit=crop"
                                            alt="Jarrón de Cerámica"
                                        />
                                        <div className={`${styles.generalInfo} ${raleway.className}`}>
                                            <h2>Jarrón de Cerámica Artesanal</h2>
                                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nemo inventore nulla nostrum iure fugiat ex sit voluptates perferendis quos magni cum amet eligendi nihil molestias similique ipsum, ullam quisquam.</p>
                                            <button className={raleway.className}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.prdInfo}>
                                        <div className={styles.btnQuantity}>
                                            <button className={styles.btnMinus}>
                                                <HiMinus />
                                            </button>
                                            <span className={roboto.className}>1</span>
                                            <button className={styles.btnPlus}>
                                                <HiPlus />
                                            </button>
                                        </div>
                                        <span className={roboto.className}>$550.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.dvSummary}>
                                <h2 className={ralewayPrd.className}>Resumen del pedido</h2>

                                <hr className={styles.separator} />

                                <div className={styles.dvTotal}>
                                    <span className={`${styles.textLeft} ${raleway.className}`}>Total</span>
                                    <span className={`${styles.textRight} ${roboto.className}`}>$550.00</span>
                                </div>

                                <button className={`${styles.btnPay} ${ralewayPrd.className}`}>
                                    Proceder al pago
                                </button>

                                <div className={styles.dvExplorer}>
                                    <Link className={`${styles.lkExplorer} ${raleway.className}`} href="/">
                                        Seguir explorando
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}