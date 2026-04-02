import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Cada que un usuario quiera ver lo que compone su compra, se manda a llamar
        // No es necesaria otra función
        const { id } = req.query;
        const { data, error } = await supabase
            .from('DetailsSale')
            .select(`
            quantity,
            totalPaid,
            createdAt,
            Product(
            name,
            description
            )
            `)
            .eq('idSale', id);
        if(error) return res.status(500).json({error: error.message});
        return res.status(200).json(data);
    }
}