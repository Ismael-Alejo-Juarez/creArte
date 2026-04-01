import { supabase } from "@/lib/supabase";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { id } = req.query;
    if (req.method === 'PUT') {
        try {
            const { newData, toEdit } = req.body;
            let indication = {};
            switch (toEdit) {
                case "name":
                    indication = { name: newData };
                    break;
                case "lastName":
                    indication = { lastName: newData };
                    break;
                case "seller":
                    indication = { seller: newData };
                    break;
                case "imgProfile":
                    indication = { imgProfile: newData };
                    break;
                case "email":
                    indication = { email: newData };
                    break;
                case "phoneNumber":
                    indication = { phoneNumber: newData };
                    break;
                case "password":
                    const { data: user, error } = await supabase
                        .from('User')
                        .select('password')
                        .eq('idUser', id)
                        .single();
                    if(error || !user) return res.status(404).json({error: "User doesn't exists!"});
                    const isTheSamePass = await bcrypt.compare(newData, user.password);
                    if (isTheSamePass) return res.status(400).json({ error: "Password must be different!" });
                    const hashNewPass = await bcrypt.hash(newData, 10);
                    indication = {password: hashNewPass};
                    break;
                default:
                    indication = {};
                    break;
            }
            const { data, error } = await supabase
                .from('User')
                .update(indication)
                .eq('idUser', id)
                .select()
                .single();
            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ message: "User update!", data: data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        const { error } = await supabase
            .from('User')
            .delete()
            .eq('idUser', id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: "User eliminated!" });
    }
}