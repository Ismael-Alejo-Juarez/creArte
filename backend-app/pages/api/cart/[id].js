import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    // Carrito:
    /**
     * Viene el id del producto. Así se guarda toda la info. del producto
     * Se guarda de quién es el carrito
     * Se guarda la cantidad del producto
     */
    const { id } = req.query;
    if (req.method === 'GET') {
        // Traer el carrito
        const { data: cart, error } = await supabase
            .from('Cart')
            .select(`
                quantity,
                Product(
                    name,
                    price, 
                )
                `)
            .eq('idUser', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(cart);
    } else if (req.method === 'POST') {
        const { cart } = req.body;
        cart.forEach(async product => {
            // Por cada producto se crea un registro en el carrito
            const { data, error } = await supabase
                .from('Cart')
                .insert(
                    {
                        idUser: id,
                        idProduct: product.idProduct,
                        quantity: product.quantity
                    }
                )
                .select();
            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ message: "Data inserted!", data: data });
        });
    }
}