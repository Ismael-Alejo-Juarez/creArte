import Header from "@/components/Header"
import Footer from "@/components/Footer"
import styles from "@/styles/Form.module.css"
import Link from "next/link"
import { raleway, ralewayS } from "@/fonts/Raleway"

export default function SignIn() {
    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.formContainer}>
                    <h2 className={`${styles.title} ${ralewayS.className}`}>Bienvenido a creArte</h2>
                    <div className={styles.textFields}>
                        <input className={`${styles.input} ${raleway.className}`} type="email" name="" id="" placeholder="Correo electrónico"/>
                        <input className={`${styles.input} ${raleway.className}`} type="password" name="" id="" placeholder="Contraseña"/>
                        <span>
                            <Link className={`${styles.forgetPass} ${styles.link} ${raleway.className}`} href={"/recovery-pass"}>¿Olvidaste tu contraseña?</Link>
                        </span>
                    </div>
                    <div className={styles.buttons}>
                        <button className={`${ralewayS.className}`} type="button">Iniciar sesión</button>
                        <span className={`${raleway.className}`}>¿No tienes cuenta? <Link href={"/sign-up"}
                            className={`${styles.link} ${raleway.className}`}>Crear cuenta</Link></span>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}