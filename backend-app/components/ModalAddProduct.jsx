import styles from "@/styles/ModalAdd.module.css";
import { raleway, ralewayS } from '@/fonts/Raleway';
import { useState, useRef } from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function ModalAddProduct({ onCloseModal, setFinalImages }) {
    const [images, setImages] = useState([]);
    const [messageError, setMessageError] = useState("");
    const addImageRef = useRef(null);
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

    const handleSaveImages = () => {
        // Validar que hay imágenes
        if(images.length > 0){
            setMessageError("");
            setFinalImages(images);
            const close = () => {onCloseModal};
        }else{
            setMessageError("¡Agrega por lo menos una imagen a tu producto!");
        }
    }

    return (
        <div className={styles.addImagesContainer}>
            <div className={styles.titleContainer}>
                <h2 
                className={`
                ${styles.title}
                ${ralewayS.className}`}>Añadir imágenes</h2>
            </div>
            <div className={styles.btnAddContainer}>
                <input
                    ref={addImageRef}
                    className={styles.toInvisible}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddImage} />
                <button
                    type="button"
                    className={`
                    ${styles.btnAdd} 
                    ${styles.buttonStyle}
                    ${images.length > 0 ? styles.toInvisible : ''}
                    ${raleway.className}`}
                    onClick={() => addImageRef.current.click()}>
                    {"Subir imágenes (0/4)"}
                </button>
                <p className={styles.messageError}>{messageError}</p>
            </div>
            <div className={styles.viewImageContainer}>
                {/* Se agregan las imágenes correspondientes */}
                {images.length > 0 && (
                    images.map((image, index) => (
                        <div className={styles.viewImage}>
                            <div key={index} className={styles.divimage}>
                                <img className={styles.image}
                                    src={URL.createObjectURL(image)}  // Creación de una url temporal
                                    alt={image.name} />
                            </div>
                            <div className={styles.btnImagesContainer}>
                                <button
                                    type="button"
                                    className={`
                                    ${styles.btnViewImage} 
                                    ${styles.buttonStyle}
                                    ${raleway.className}`}>
                                    Ver imagen
                                </button>
                                <button 
                                type="button"
                                className={`
                                    ${styles.btnDeleteImage} 
                                    ${styles.buttonStyle}`}
                                onClick={() => handleRemoveImage(index)}>
                                    {/*Icono de basura*/}
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {/* Cuando haya espacio, se agregan opciones así */}
                <div className={`
                    ${styles.imageVoid}
                    ${images.length > 0 && images.length < maxImages ? '' : styles.toInvisible}`}>
                    <button
                        type="button"
                        className={`
                            ${styles.btnAdd} 
                            ${styles.buttonStyle}
                            ${raleway.className}`}
                        onClick={() => addImageRef.current.click()}>
                        {`Subir imagen (${images.length}/4)`}
                    </button>
                </div>
            </div>
            <div className={styles.actionsContainer}>
                <button 
                type="button" 
                className={`
                ${styles.cancelAddImages} 
                ${styles.buttonStyle}
                ${raleway.className}`}
                onClick={onCloseModal}>Cancelar</button>
                <button 
                type="button" 
                className={`
                ${styles.acceptAddImages} 
                ${styles.buttonStyle}
                ${raleway.className}`}
                onClick={() => handleSaveImages()}>Aceptar</button>
            </div>
        </div>
    );
}