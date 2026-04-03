import styles from "@/styles/Product.module.css"
import Link from "next/link";
import { raleway, ralewayPrd } from "@/fonts/Raleway";
import { roboto } from "@/fonts/Roboto";

export default function Product({id, name, price, image}){
    console.log("Image: ", image);
    return (
        <Link href={`/product/${id}`} className={styles.productContainer}>
            <div className={styles.imgProduct}>
                <img src={image.url} alt={image.url} />
            </div>
            <div className={`${styles.infoProduct} ${raleway.className}`}>
                <p className={`${styles.nameProduct} ${ralewayPrd.className}`}>
                    {name}
                </p>
                <p className={`${styles.priceProduct} ${roboto.className}`}>
                    ${price.toFixed(2)}MXN
                </p>
            </div>
        </Link>
    );
}