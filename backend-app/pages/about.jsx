import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from '@/styles/About.module.css';
import { raleway, ralewayPrd, ralewayS } from '@/fonts/Raleway';

export default function AcercaDe() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.imgProfile}>
            <img src="https://avatars.githubusercontent.com/u/200666667?v=4" alt="foto" />
          </div>
          <div className={styles.infoText}>
            <p className={raleway.className}>Desarrollado por: <span className={ralewayS.className}>Ismael Alejo Juárez</span></p>
          </div>
          <div className={styles.summary}>
            <p className={raleway.className}>El desarrollo de este sitio e-commerce es con propósitos personales, con él se busca mejorar
              la expericiencia y conocimiento acerca del desarrollo con Next.js + Node.js. Además, es el punto de inicio para el crecimiento
              de mi portafolio.
            </p>
          </div>
          <p className={raleway.className}>GitHub: <Link href={"https://github.com/Ismael-Alejo-Juarez"}>Ismael-Alejo-Juarez</Link></p>
        </div>
      </main>
      <Footer />
    </>
  );
}