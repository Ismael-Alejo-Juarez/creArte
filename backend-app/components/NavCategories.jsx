import styles from '@/styles/NavCategories.module.css'
import { raleway, ralewayS } from '@/fonts/Raleway';

export default function NavCategories() {
  return (
    <div className={styles.nav}>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${ralewayS.className}`}>
            {/* Botón que, al ser presionado, lista todos los productos disponibles
            con un límite de 20 */}
            Todo
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Textiles y tejidos
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Barro y cerámica
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Madera tallada
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Papel y cartón
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Pintura
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Palma y fibras naturales
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Hogar y decoración
        </button>
        <span className={styles.separator}>|</span>
        <button type='button' 
        className={`
        ${styles.btnCategoria}
        ${raleway.className}`}>
            Joyería y accesorios
        </button>
    </div>
  );
}