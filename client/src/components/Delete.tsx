import { useMutation, type MutationFunction } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { AlertCircleIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function Delete({
  titleMessage,
  mutFunc,
  toURL,
  mainMessage = "",
}: {
  titleMessage: string;
  mutFunc: MutationFunction;
  toURL: string;
  mainMessage?: string;
}) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: mutFunc,
    onSuccess: () => navigate(toURL),
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(null);
  }

  return (
    <Dialog>
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
