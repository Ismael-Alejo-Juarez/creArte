import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Traer todos los productos creados
        const { data, error } = await supabase
            .from('Product')
            .select('*');
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    }
    if (req.method === 'POST') {
        try {
            const { idCreator, name, description, stock, price } = req.body;
            // Arreglo hardcodeado
            const images = [
                'https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/products-images/leon.jpg',
                'https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/products-images/leon.jpg',
                'https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/products-images/leon.jpg',
                'https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/products-images/leon.jpg']
            // Crear un producto
            // Creamos el producto antes de subir la imagen (o sus imágenes)
            const { data: product, error } = await supabase
                .from('Product')
                .insert({
                    idCreator,
                    name,
                    stock,
                    price,
                    description
                })
                .select()
                .single();
            if (error) return res.status(500).json({ error: error.message });
            // Insertamos sus imágenes
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const { data: imgProduct, error } = await supabase
                    .from('ImageProduct')
                    .insert({
                        idProduct: product.idProduct,
                        url: img,
                        order: i
                    })
                    .select()
                    .single();
                if (error) return res.status(500).json({ error: error.message });
            }
            // Nada más para asegurar que no hubo ningún error, quizá es inútil
            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ message: "Product created!" });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}