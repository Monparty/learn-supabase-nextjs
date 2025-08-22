"use server";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function register(prevState: any, formData: FormData) {
    try {
        const fullname = formData.get("fullname");
        const email = formData.get("email");
        const tel = formData.get("tel");
        const attachment = formData.get("attachment") as File;
        const fileName = uuidv4();
        const supabase = createClient();
        // console.log("Data:", fullname, email, tel, attachment);

        let attachmentUrl = null;

        if (attachment.size !== 0) {
            const { error } = await supabase.storage
                .from("attachments")
                .upload(fileName, attachment);
            if (error) {
                console.log("error: ", error);
                return { message: "upload error" };
            } else {
                console.log("Upload successful!");

                const { data } = supabase.storage
                    .from("attachments")
                    .getPublicUrl(fileName);

                attachmentUrl = data.publicUrl
                // console.log(data.publicUrl)
            }
        }

        const { error: insertError } = await supabase.from("users").insert([
            {
                fullname,
                email,
                tel,
                attachment: attachmentUrl,
            },
        ]);

        if (insertError) {
            console.log("Insert error: ", insertError);

            if (insertError.code === "23505") {
                return { message: "อีเมลซ้ำนะจ๊ะ" };
            }

            return { message: "register failed" };
        }

        console.log("Register successful!");
        
        return { success: true };
    } catch (error) {
        console.log("error", error);
        return { message: "Internal server error" };
    }
}
