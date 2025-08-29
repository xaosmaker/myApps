import { useMutation, type MutationFunction } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { AlertCircleIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { queryClient } from "@/queryClient";

export default function Delete({
  titleMessage,
  mutFunc,
  toURL,
  queryName,
  mainMessage = "",
}: {
  titleMessage: string;
  mutFunc: MutationFunction;
  toURL: string;
  mainMessage?: string;
  queryName?: string;
}) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: mutFunc,
    onSuccess: () => {
      setIsDialogOpen(false);
      if (queryName) {
        queryClient.invalidateQueries({ queryKey: [queryName] });
      }
      navigate(toURL, { replace: true });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(null);
  }

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger className="flex gap-4 hover:cursor-pointer">
        <Trash2 /> Delete
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="hidden">Delete Item</DialogTitle>
        <DialogDescription className="hidden">
          A form to delete an Item
        </DialogDescription>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle className="capitalize">
            Are you sure you want to delete {titleMessage}?
          </AlertTitle>
          <AlertDescription className="pt-4">
            {mainMessage} <br />
            Are you sure
            <form onSubmit={handleSubmit} className="mt-4">
              <Button variant="destructive">Delete</Button>
            </form>
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
