import { useMutation } from "@tanstack/react-query";
import { deleteTodoItemApi } from "../services/todoApiServices";
import { queryClient } from "@/queryClient";

export function useDeleteTodo() {
  // TODO: fix the on success
  const { mutate, isPending: isDeleteTodoPending } = useMutation({
    mutationFn: (pkid: number) => deleteTodoItemApi(pkid),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
  const deleteMutate = (pkid: number) => () => {
    mutate(pkid);
  };
  return { deleteMutate, isDeleteTodoPending };
}
