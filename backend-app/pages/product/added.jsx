import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/AddProduct.module.css";
import forms from "@/styles/Form.module.css";
import { raleway, ralewayS, ralewayPrd } from "@/fonts/Raleway";
import { roboto } from "@/fonts/Roboto";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { capitalize } from "@/fonts/Capitalize";
import { MdDriveFolderUpload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AddProduct({ categories }) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [addImages, setModal] = useState(false);
    const maxLength = 500;
    return (
        <div>
            <Header />
            <main className={forms.mainContainer} >
                <div
                    className={`
                ${forms.formContainer}
                ${addImages ? styles.formBlur : ''}
                `}
                >
                    <h2 className={`${forms.title} ${ralewayS.className}`}>Agregar un producto</h2>
                    <div className={styles.textFields}>
                        <input className={`${forms.input} ${raleway.className}`} type="text" name="" id="" placeholder="Título del producto" />
                        {/* Cambiar a textarea */}
                        <textarea
                            value={description}
                            className={`${forms.input} ${raleway.className} ${styles.textArea} `}
                            name="" id=""
                            placeholder="Descripción del producto"
                            maxLength={500}
                            rows={8}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span
                            className={`
                            ${styles.limitText} 
                            ${description.length >= 450 ? styles.red : ''}
                            ${roboto.className}`}
                        >{description.length}/{maxLength}</span>
                        <div className={`${styles.smallInputs}`}>
                            <input
                                className={`${forms.input} ${raleway.className} ${styles.noArrows}`}
                                type="number" name="" id="" placeholder="Cantidad disponible" />
                            <input
                                className={`${forms.input} ${raleway.className} ${styles.noArrows}`}
                                type="number" name="" id="" placeholder="Precio" />
                        </div>
                        <div className={styles.smallInputs}>
                            <select
                                className={`${forms.input}`}
                                value={category}
                                name="" id=""
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="selecciona">
                                    -- Selecciona una categoría --
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.idCategory} value={cat.nameCategory}>
                                        {capitalize(cat.nameCategory)}
                                    </option>
                                ))}
                            </select>
                            <button
                                className={`${ralewayPrd.className} ${styles.button}`}
                                type="button"
                                onClick={() => setModal(true)}
                            >Añadir imágenes<MdDriveFolderUpload className={styles.btnIcon} /></button>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            href={"/dashboard"}
                            className={`${ralewayS.className} 
                        ${styles.buttonBack}
                        ${styles.inactiveButton}`}
                            type="button">Regresar</Link>
                        <button
                            className={`${ralewayS.className} 
                        ${forms.button}`}
                            type="button">Agregar producto</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export async function getServerSideProps() {
    const { data, error } = await supabase
        .from('Category')
        .select('*');
    if (error) return { error: error.message };
    return { props: { categories: data } };
}