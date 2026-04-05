import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/IndividualProduct.module.css";
import { raleway, ralewayPrd, ralewayS } from "@/fonts/Raleway";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";
import { roboto } from "@/fonts/Roboto";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function ViewProduct({ product }) {
    const [mainImage, setMainImage] = useState(product.ImageProduct[0].url);
    const [quantity, setQuantity] = useState(1);
    return (
        <div>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.infoContainer}>
                    <div className={styles.images}>
                        <div className={styles.listImages}>
                            {product.ImageProduct.map((image) => (
                                <img
                                    onClick={() => setMainImage(image.url)}
                                    src={image.url}
                                    alt={product.name}
                                    className={`${styles.imgProductList}
                                    ${mainImage == image.url ? styles.imgActual : styles.imgInactive}`} />
                            ))}
                        </div>
                        <img src={mainImage} alt=""
                            className={styles.imgProduct} />
                    </div>
                    <div className={`${raleway.className} ${styles.generalInfo}`}>
                        <h2 className={styles.title}>{product.name}</h2>
                        <p className={`${roboto.className} ${styles.price}`}>${product.price.toFixed(2)}MXN</p>
                        <p className={styles.description}>
                            {product.description}</p>
                        <p className={styles.stock}>
                            Cantidad disponible: {product.stock}
                        </p>
                        <div className={styles.btnQuantity}>
                            <button
                                onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)}
                                className={styles.btnMinus}>
                                <HiMinus />
                            </button>
                            <span className={roboto.className}>{quantity}</span>
                            <button
                                onClick={() => quantity < product.stock ? setQuantity(quantity + 1) : setQuantity(quantity)}
                                className={styles.btnPlus}>
                                <HiPlus />
                            </button>
                        </div>
                        <button className={`${styles.btnAdd} ${ralewayPrd.className}`}>Agregar al carrito</button>
                        <Link href={"/"} className={`${raleway.className} ${styles.linkBack}`}>
                            <IoArrowBackOutline />Regresar a la tienda
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const { id } = params;

    const { data, error } = await supabase
        .from('Product')
        .select(`
        idProduct,
        name,
        price,
        stock,
        description,
        ImageProduct(
            url,
            order
        )
        `)
        .eq('idProduct', id)
        .single();
    if (error) return { notFound: true };
    return { props: { product: data } };
}