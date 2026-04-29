import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data)=>createEditCabin(data),
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      console.error(`Error occured while creating cabin ${err}`);
      toast.error(
        "Something went wrong while creating cabin. Please try again later!",
      );
    },
  });
  return { createCabin, isCreating };
}
