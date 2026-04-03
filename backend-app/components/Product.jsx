import styles from "@/styles/Product.module.css"
import { raleway, ralewayPrd, ralewayPre } from "@/fonts/Raleway";

export default function Product(){
    return (
        <div className={styles.productContainer}>
            <div className={styles.imgProduct}>
                <img src="https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/products-images/leon.jpg" alt="leon-peluche" />
            </div>
            <div className={`${styles.infoProduct} ${raleway.className}`}>
                <p className={`${styles.nameProduct} ${ralewayPrd.className}`}>
                    Leon de peluche hecho a mano con hilo muy bonito con estambre y cosas así
                </p>
                <p className={`${styles.priceProduct} ${ralewayPre.className}`}>
                    $150.00MXN
                </p>
            </div>
        </div>
    );
}