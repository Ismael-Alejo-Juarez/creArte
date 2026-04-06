import Header from "@/components/Header"
import Footer from "@/components/Footer"
import styles from "@/styles/Form.module.css"
import Link from "next/link"
import { raleway, ralewayS } from "@/fonts/Raleway"

export default function SignUp() {
    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h2 className={`${styles.title} ${ralewayS.className}`}>Crea tu cuenta en creArte</h2>
                    <div className={styles.textFields}>
                        <input className={`${styles.input} ${raleway.className}`} type="email" name="" id="" placeholder="Nombre"/>
                        <input className={`${styles.input} ${raleway.className}`} type="email" name="" id="" placeholder="Apellidos"/>
                        <input className={`${styles.input} ${raleway.className}`} type="email" name="" id="" placeholder="Correo electrónico"/>
                        <input className={`${styles.input} ${raleway.className}`} type="password" name="" id="" placeholder="Contraseña"/>
                        <input className={`${styles.input} ${raleway.className}`} type="password" name="" id="" placeholder="Confirmar contraseña"/>
                    </div>
                    <div className={styles.buttons}>
                        <button className={`${ralewayS.className} ${styles.button}`} type="button">Registrarse</button>
                        <span className={`${raleway.className}`}>¿Ya tienes cuenta? <Link href={"/sign-in"}
                            className={`${styles.link} ${raleway.className}`}>Inicia sesión</Link></span>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}