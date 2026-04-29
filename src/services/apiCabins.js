import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabin, error } = await supabase.from("cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabin;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabin").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = typeof newCabin?.image == 'string'
  console.log('id',id);
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  let query = supabase.from("cabin");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  console.log(query);
  const { data, error } = await query.select();
  console.log("updated data", data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded to storage.");
  }
  return data;
}

