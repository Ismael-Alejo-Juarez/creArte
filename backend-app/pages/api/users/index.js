import { supabase } from "@/lib/supabase";
import bcrypt from 'bcryptjs';
import { uploadImage } from "@/lib/storage";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Me va a traer a todos los usuarios registrados
        const { data, error } = await supabase
            .from('User')
            .select('*');
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    } else if (req.method === 'POST') {
        // Crea un nuevo usuario y devuelve los datos del mismo
        try {
            // Recibe cada dato del body, es decir, cada dato necesario para la creación de un nuevo usuario
            const { name, lastName, seller, email, password, phoneNumber } = req.body;
            // Encripta la contraseña
            const hashPass = await bcrypt.hash(password, 10);
            // Imagen hardcodeada
            const imgProfile = 'https://zzazkqeezmxrywscnnat.supabase.co/storage/v1/object/public/profile-image/perfil.jpg';
            const { data, error } = await supabase
                .from('User')
                .insert({
                    name,
                    lastName,
                    seller,
                    imgProfile,
                    email,
                    password: hashPass,
                    phoneNumber
                })
                .select()
                .single();
            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ message: "User added!", data: data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}