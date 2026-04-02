import { supabase } from "@/lib/supabase";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    // ID del usuario actual
    const { id } = req.query;
    if (req.method === 'GET') {
        // Traer las tarjetas que tiene registrada
        const { data, error } = await supabase
            .from('Card')
            .select('number')
            .eq('idUser', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { number, expirationDate, cvv } = req.body;
        // Tengo que verificar que la tarjeta no esté registrada
        const { data, error } = await supabase
            .from('Card')
            .select('number')
            .eq('idUser', id);
        if (error) return res.status(500).json({ error: error.message });
        // Tenemos en data el number => data.number
        // Comparamos si son iguales
        for (let j = 0; j < data.length; j++) {
            const n = data[j];
            // Con que solo una sea igual
            if (number === n.number) return res.status(500).json({ error: "The card number must be different!" });
        }
        // No existe, la registramos
        // Pero antes, encriptamos el cvv
        const encriptCVV = await bcrypt.hash(cvv, 10);
        // expirationDate llega como "01/2001" desde el front
        const { data: insertCard, error: errInsert } = await supabase
            .from('Card')
            .insert({
                idUser: id,
                number: number,
                expirationDate: expirationDate,
                cvv: encriptCVV
            })
            .select()
            .single();
        if (errInsert) return res.status(500).json({ error: errInsert.message });
        return res.status(200).json({ message: "Card added!", data: insertCard });
    } else if (req.method === 'DELETE') {
        const { number } = req.body;
        // Borrar tarjeta donde el número y el id sean igual
        // Dos eq => Dos condiciones
        const { error } = await supabase
            .from('Card')
            .delete()
            .eq('idUser', id)
            .eq('number', number);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "Card deleted!" });
    }
}