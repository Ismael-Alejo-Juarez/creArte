import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { idSale, status } = req.body;
        const { data, error } = await supabase
            .from('Sale')
            .update({ status: status })
            .eq('idSale', idSale)
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "Sale updated!", data: data });
    } else if (req.method === 'GET') {
        // Esto probablemente sea raro, explicamos
        /**
         * Este GET devuelve las ventas que haya hecho un comprador, shopping son compras del cliente
         * lo que genera ventas para un vendedor.
         * CLIENTE => Compras
         * VENDEDOR => Ventas reales
         * Es por eso que, en lugar de devolver algo de la tabla de Sale, devuelve los datos individuales de DetailsSale
         */
        // Traigo el id del usuario actual, el cual es un vendedor
        const { idUser } = req.body;
        // Este arreglo guardará TODAS las ventas que haya tenido el vendedor, separando por producto
        // Un arreglo para un producto dentro del arreglo
        const finalSale = [];
        // Me traigo la id de los productos del usuario/vendedor
        const { data: idProducts, error } = await supabase
            .from('Product')
            .select('idProduct')
            .eq('idCreator', idUser);
        if (error) return res.status(500).json({ error: error.message });
        // Las busco en la tabla details
        for (let i = 0; i < idProducts.length; i++) {
            const idPrd = idProducts[i];
            // Por cada producto, traer ventas individuales
            const { data: detailsPrd, error: errorPrd } = await supabase
            .from('DetailsSale')
            .select('*')
            .eq('idProduct', idPrd.idProduct);
            if(errorPrd) return res.status(500).json({error: errorPrd.message});
            // Agregar los datos al arreglo de ventas
            finalSale.push(detailsPrd);
        }
        return res.status(200).json({message: "All sales found!", products: finalSale});
    }
}