import { supabase } from "@/lib/supabase";

export async function uploadImage(file: File, bucket: string, path: string) {
  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const fullPath = `${path}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fullPath, file);

  if (error) {
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    publicUrl: publicData.publicUrl,
  };
}

export async function deleteImage(publicUrl: string) {
  const prefix = "/storage/v1/object/public/store-platform-assets/";

  const path = publicUrl.split(prefix)[1];

  const { data, error } = await supabase.storage
    .from("store-platform-assets")
    .remove([path]);

  console.log("REMOVE DATA:", data);
  console.log("REMOVE ERROR:", error);
}
