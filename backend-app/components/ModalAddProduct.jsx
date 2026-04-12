export default function ModalAddProduct() {
    const [images, setImages] = useState([]);
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
    return (
        <div className={`${styles.modalImages} ${addImages ? '' : styles.modalDisabled}`}>
            <div className={styles.containerModal}>
                <h2 className={ralewayS.className}>Añadir imágenes</h2>
                {/* Muestra si sigue dentro del rango de max. images */}
                {/* Este input está oculto, se refiere desde un botón */}
                <input
                    ref={addImageRef}
                    className={styles.invisibleInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddImage} />
                <button disabled={images.length < maxImages ? false : true} onClick={() => addImageRef.current.click()} className={`${styles.uploadImage} ${raleway.className}`}>
                    Agregar imágenes
                </button>
                <div className={styles.listImages}>
                    {images.map((image, index) => (
                        // Estamos agregando archivos, * estudiar código *
                        <div key={index} className={styles.imgAdded}>
                            <img
                                src={URL.createObjectURL(image)}  // Creación de una url temporal
                                alt={image.name}
                                width={100}
                                className={styles.imgPreview}
                            />
                            <div className={styles.optionsImage}>
                                <p className={`${styles.nameImage} ${raleway.className}`}>{image.name}</p>
                                <button onClick={() => handleRemoveImage(index)} className={styles.btnDelete}>
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}