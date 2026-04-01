import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'GET') {
        // Este método será llamado cada que se desee visualizar un producto individual
        const { data, error } = await supabase
            .from('Product')
            .select('*')
            .eq('idProduct', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    } else if (req.method === 'PUT') {
        // Este método será llamado cada que se edite algo de un producto
        // (solo el vendedor propietario del producto puede editar)
        const { newData, toEdit } = req.body;
        let indication = {};
        switch (toEdit) {
            case "name":
                indication = { name: newData }
                break;
            case "stock":
                indication = { stock: newData };
                break;
            case "price":
                indication = { price: newData };
                break;
            case "description":
                indication = { description: newData }
                break;
            default:
                indication = {};
                break;
        }
        if (indication == {}) return res.status(400).json({ error: "Don't find a indication!" });
        const { data, error } = await supabase
            .from('Product')
            .update(indication)
            .eq('idProduct', id)
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "Product update!", data: data });
    } else if (req.method === 'DELETE') {
        // Cada que el vendedor quiera eliminar alguno de sus productos, este método será llamado
        const { error } = await supabase
            .from('Product')
            .delete()
            .eq('idProduct', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "Product deleted!" });
    }
}