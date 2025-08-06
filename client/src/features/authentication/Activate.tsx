import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import type { ActivateUser } from "./types/authTypes";
import { activateUserApi } from "@/services/authApiCalls";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function Activate() {
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { mutate } = useMutation({
    mutationFn: activateUserApi,
    onError: () => {
      setHasError(true);
    },
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

      {hasError && (
        <>
          <Alert variant="destructive" className="w-fit">
            <AlertDescription className="text-center">
              Invalid Activation Code please Try another Time
              <br />
              OR try to Login
            </AlertDescription>
          </Alert>
          <NavLink to={"/login"}> login</NavLink>
        </>
      )}
    </div>
  );
}
