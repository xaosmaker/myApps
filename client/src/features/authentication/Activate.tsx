import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import type { ActivateUser } from "./types/authTypes";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { activateUserApi } from "./services/authApiServices";

export default function Activate() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { mutate, error, isError } = useMutation({
    mutationFn: activateUserApi,
    onSuccess: () => {
      toast("Your account activate succesfully Please Login", {
        duration: 15000,
        closeButton: true,
      });
      navigate("/login");
    },
  });

  useEffect(() => {
    if (uid && token) {
      const data: ActivateUser = { uid: uid, token: token };
      mutate(data);
    }
  }, [mutate, token, uid]);

  return (
    <div className="flex h-svh w-dvw flex-col items-center justify-center gap-10">
      <div>Activation in Progress Please Wait</div>

      {isError && (
        <>
          <Alert variant="destructive" className="w-fit">
            <AlertDescription className="text-center">
              {error.message}
            </AlertDescription>
          </Alert>
          <NavLink to={"/login"}> login</NavLink>
        </>
      )}
    </div>
  );
}
