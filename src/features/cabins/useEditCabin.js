import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(){
    const queryClient = useQueryClient();
  const {mutate:editCabin, isPending:isEditing } = useMutation({
    mutationFn: ({newCabin,id})=>createEditCabin(newCabin,id),
    onSuccess: () => {
      toast.success("Cabin Edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError:(err) =>{
      console.error(`Error occured while editing cabin ${err}`)
      toast.error('Something went wrong while editing cabin. Please try again later!')
    }
  });
  return {editCabin,isEditing}
}