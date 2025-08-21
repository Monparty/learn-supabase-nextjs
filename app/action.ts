"use server";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid"

export async function register(formData: FormData) {
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const tel = formData.get("tel");
    const attachment = formData.get("attachment") as File;
    const fileName = uuidv4();

    const supabase = createClient();
    console.log("Data:", fullname, email, tel, attachment);

    const { error } = await supabase.storage
        .from("attachments")
        .upload(fileName, attachment);
    if (error) {
        console.log("error: ", error);
        return false;   
    } else {
        console.log("Upload successful!");
    }

    const { data } = supabase.storage.from('attachments').getPublicUrl(fileName)
    // console.log(data.publicUrl)

    try {
        const { error } = await supabase.from("users").insert([
            {
                fullname,
                email,
                tel,
                attachment: data.publicUrl,
            },
        ]);
        if (error) throw error;
        //   router.push("/protected");
    } catch (error: unknown) {
        console.log("found some error:", error);
    }

    console.log("Register successful!");
}
