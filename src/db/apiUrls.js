import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id){
    const { data, error} = await supabase.from("urls").select("*").eq("user_id",user_id);
    if(error)
        {   console.error(error.message)
            throw new Error("unable to fetch URLs")
        }
    return data;
}

export async function deleteUrl(id){
    const { data, error} = await supabase.from("urls").delete().eq("id",id);
    if(error)
        {   console.error(error.message)
            throw new Error("unable to Delete URL")
        }
    return data;
}

export async function createUrl({title,longUrl,customUrl,user_id},qrcode){
    const short_url =Math.random().toString(36).substring(2,6)
    const fileName = `qr -${short_url}`;

    const {error: storageError} = await supabase.storage
    .from("qrs").upload(fileName,qrcode);

    if(storageError){
        throw new Error(storageError.message);
    }

    const qr =  `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`

    const { data, error} = await supabase.from("urls").insert([
        {
            title,
            original_url : longUrl,
            custom_url :customUrl || null,
            user_id,
            short_url,
            qr
        }
    ]).select();

    if(error)
        {   console.error(error.message)
            throw new Error("Error While creating short URL")
        }
    return data;
}

export async function getLongUrl(id){
    const { data, error} = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

    if(error)
        {   console.error(error.message)
            throw new Error("Error fetching short link")
        }
    return data;
}

export async function getUrl({id,user_id}){
    const { data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id",id)
    .eq("user_id",user_id)
    .single();

    if(error)
        {   console.error(error.message)
            throw new Error("Short URL not found")
        }
    return data;
}

