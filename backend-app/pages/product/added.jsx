import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/AddProduct.module.css";
import forms from "@/styles/Form.module.css";
import { raleway, ralewayS, ralewayPrd } from "@/fonts/Raleway";
import { roboto } from "@/fonts/Roboto";
import Link from "next/link";
import { useEffect, useState } from "react";
import { capitalize } from "@/fonts/Capitalize";
import { MdDriveFolderUpload } from "react-icons/md";
import ModalAddProduct from "@/components/ModalAddProduct";

export default function AddProduct({ categories }) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [addImages, setAddImages] = useState(false);
    const [actualImages, setActualImages] = useState([]);
    const maxLength = 500;

    const onCloseModal = () => {
        setAddImages(false);
    }
    useEffect(() => {
        console.log(actualImages);
    }, [actualImages])
    return (
        <div onKeyDown={(e) => e.key === 'Escape' && addImages == true ? setAddImages(false) : ''}>
            <div className={addImages == true ? styles.activeModal : styles.invisibleInput}>
                <ModalAddProduct
                    onCloseModal={onCloseModal}
                    setFinalImages={setActualImages} />
            </div>
            <div
                className={`
                ${styles.mainContent}
                ${addImages == true ? styles.formBlur : ''}`}>
                <Header />
                <main className={forms.mainContainer} >
                    <div
                        className={`
                        ${forms.formContainer}
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
                                    onClick={() => setAddImages(true)}
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