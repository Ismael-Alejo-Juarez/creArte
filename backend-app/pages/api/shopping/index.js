import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    // ¿Qué necesitamos recibir en cada consulta?
    // Para POST en Ventas: 
    /**
     * 1. idUser => Cliente
     * 2. totalProducts => Este se calcula sumando cada total de productos por separado
     * 3. total => Este se calcula sumando los precios de cada producto (ya multiplicado por la cantidad)
     */
    // Para POST en Detalles:
    /**
     * 1. idSale => Ya creada la venta, se extrae el id
     * 2. idProduct => Esto debe venir en los datos del producto
     * 3. totalProducts => El total de productos individuales
     * 4. totalPrice => El total a pagar por cada producto individual
     */
    // Entonces necesito traer para POST:
    /**
     * 1. Un arreglo "Carrito" donde vengan los productos separados
     * 2. El id del usuario haciendo el encargo (usuario actual)
     */
    if (req.method === 'GET') {
        // Aquí tendría que obtener solo las ventas que ha hecho cierto usuario
        // CLIENTE: Total de compras que ha hecho
        // Por cada venta se meten datos a la tabla de detalles
        // Devuelvo las ventas que se hayan hecho desde un cliente con idUser
        const { idUser } = req.body;
        const { data, error } = await supabase
            .from('Sale')
            .select('*')
            .eq('idUser', idUser);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "All data!", data: data });
    } else if (req.method === 'POST') {
        // Recibimos al usuario actual y su carrito (arreglo de productos)
        const { idUser, products, totalPrice, totalProducts } = req.body;
        // ¿Cómo se va a calcular totalPrice?
        // Definimos a totalPrice como el total pagado por TODO el carrito del usuario
        // El total pagado por CADA producto viene en su mismo arreglo
        // Lo que hace es insertar un nuevo dato en la tabla, al terminar la trae de vuelta
        // guardándose en "sale"
        const { data: sale, error: errorSale } = await supabase
            .from('Sale')
            .insert({
                idUser: idUser,
                totalProducts: totalProducts,
                total: totalPrice,
                // status puede variar entre: "pendiente" / "completada" / "cancelada"
                status: "pendiente"
            })
            .select()
            .single();
        if (errorSale) return res.status(500).json({ error: errorSale.message });
        // Una vez insertado, tenemos que guardar cada valor en la tabla de detalles
        for (let i = 0; i < products.length; i++) {
            const prd = products[i];
            // Por cada producto, insertar
            const { data: detailsPrd, error: errorDetail } = await supabase
                .from('DetailsSale')
                .insert({
                    idSale: sale.idSale,
                    idProduct: prd.idProduct,
                    individualPrice: prd.individualPrice,
                    quantity: prd.quantity,
                    totalPaid: prd.totalPaid
                })
                .select()
                .single();
            if (errorDetail) return res.status(500).json({ error: errorDetail.message });
            // Por cada producto, la cantidad se debe restar en la tabla de Productos
            // Traemos el stock actual del producto que estamos revisando
            const { data: actualStock, error: errorStock } = await supabase
                .from('Product')
                .select('stock')
                .eq('idProduct', prd.idProduct)
                .single();
            if (errorStock) return res.status(500).json({ error: errorStock.message });
            // Restamos las cantidades
            let finalQuantity = actualStock.stock - prd.quantity;
            console.log("Final: ", finalQuantity);
            // Entonces mandamos a actualizar
            const { error: errorUpdate } = await supabase
                .from('Product')
                .update({ stock: finalQuantity })
                .eq('idProduct', prd.idProduct);
            if (errorUpdate) return res.status(500).json({ error: errorUpdate.message });
            // De no haber error, ya quedó
        }
        // Una vez se inserten todos los detalles en la tabla acaba la inserción de datos
        return res.status(200).json({ message: "Sales created!", data: sale });
    } else if (req.method === 'DELETE') {
        // Si un cliente / usuario cancela la compra, se va de la base de datos
        const { idSale } = req.body;
        // Antes de borrar la venta, debemos borrar todo registro de ella en detalles de venta
        // ¿Se tiene que reiniciar el stock?
        // Antes de borrar los detalles, traemos todos los productos de la venta
        const { data: products, error: errorIdPrd } = await supabase
        .from('DetailsSale')
        .select('idProduct, quantity')
        .eq('idSale', idSale);
        if(errorIdPrd) return res.status(500).json({error: errorIdPrd.message});
        for (let j = 0; j < products.length; j++) {
            const prd = products[j];
            // Por cada producto, reiniciar stock
            // Traer el actualStock
            const { data: actualStock, error: errorStock } = await supabase
            .from('Product')
            .select('stock')
            .eq('idProduct', prd.idProduct)
            .single();
            if(errorStock) return res.status(500).json({error: errorStock.message});
            const finalStock = actualStock.stock + prd.quantity;
            // Mandamos a actualizar el stock nuevamente
            const { error: errorUpdateStock } = await supabase
            .from('Product')
            .update({stock: finalStock})
            .eq('idProduct', prd.idProduct);
            if(errorUpdateStock) return res.status(500).json({error: errorUpdateStock.message});
            // Se actulizó el stock
        }
        // Una vez actualizado el stock, borramos todo registro de la venta
        // Borramos los detalle venta
        const { error: errorDelDetail } = await supabase
            .from('DetailsSale')
            .delete()
            .eq('idSale', idSale);
        if (errorDelDetail) return res.status(500).json({ error: errorDelDetail.message });
        // Y borramos la venta
        const { error } = await supabase
            .from('Sale')
            .delete()
            .eq('idSale', idSale);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "Sale deleted!" });
    }
}

const body = {
    "idUser": 12, // Usuario actual
    "products": [
        {
            "idProduct": 3,
            "idCreator": 12,
            "name": "Peluche de Leon",
            "description": "Peluche de leon muy bonitio",
            "individualPrice": 150.0,
            "quantity": 2,
            "totalPaid": 300.0, // Cantidad sacada de (price * quantity)
        },
    ],
    "totalPrice": 300.0, // Este valor viene desde el front u otro archivo donde se calcule esta cantidad (price * quantity)
    // acumulator += totalPaid; Itera cada producto y saca el totalPaid, sumándolo
    "totalProducts": 2, // Este valor se obtiene después de recorrer cada producto y sumar quantity
    // acumulator += quantity
}