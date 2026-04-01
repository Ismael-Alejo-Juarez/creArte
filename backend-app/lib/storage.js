import { supabase } from "./supabase";

export async function uploadImage(file, bucket, folder = '') {
    const extension = file.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.floor(Math.random() * 100)}.${extension}`;
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
    return publicUrl;
}