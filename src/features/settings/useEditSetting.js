import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSetting(){
    const queryClient = useQueryClient();
  const {mutate:updateSetting, isPending:isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting Edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError:(err) =>{
      console.error(`Error occured while editing setting ${err}`)
      toast.error('Something went wrong while editing setting. Please try again later!')
    }
  });
  return {updateSetting,isUpdating}
}