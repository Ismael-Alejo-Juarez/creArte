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
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AddProduct({ categories }) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [addImages, setModal] = useState(false);
    const [images, setImages] = useState([]);
    const maxLength = 500;
    const maxImages = 4;
    const handleAddImage = (e) => {
        // Archivos que vienen de agregar
        const newFiles = Array.from(e.target.files);
        setImages(prev => {
            // Agrega todo lo anterior con todos los nuevos
            const combined = [...prev, ...newFiles];
            return combined.slice(0, maxImages);
        });
        // Para resetear la parte de archivos
        // Probablemente no lo ocupemos después de darle estilo
        e.target.value = '';
    }

    const handleRemoveImage = (index) => {
        // Filtra el arreglo
        // : Dame todos aquellos que no tengan el index que te indico
        setImages(prev => prev.filter((_, i) => i !== index));
    }

    useEffect(() => {
        console.log(images)
    }, [images])

    return (
        <div
            onClick={() => setModal(false)}>
            <Header />
            <main className={forms.mainContainer}>
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
                                    <option value={cat.nameCategory}>
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
                <div className={styles.modalImages} onClick={() => setModal(false)}>
                    <div className={styles.containerModal}>
                        <h2 className={ralewayS.className}>Añadir imágenes</h2>
                        {/* Muestra si sigue dentro del rango de max. images */}
                        {images.length < maxImages && (
                            <input
                                className={styles.uploadImage}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleAddImage} />
                        )}
                        {images.map((image, index) => (
                            // Estamos agregando archivos, * estudiar código *
                            <div key={index} className={styles.imgAdded}>
                                <img
                                    src={URL.createObjectURL(image)}  // Creación de una url temporal
                                    alt={image.name}
                                    width={100}
                                    className={styles.imgPreview}
                                />
                                <p className={`${styles.nameImage} ${raleway.className}`}>{image.name}</p>
                                <button onClick={() => handleRemoveImage(index)} className={styles.btnDelete}>
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        ))}
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