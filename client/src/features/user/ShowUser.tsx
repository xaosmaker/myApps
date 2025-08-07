import { useQuery } from "@tanstack/react-query";
import { showUserApi } from "../authentication/services/authApiServices";

export default function ShowUser() {
  const { data = {} } = useQuery({
    queryKey: ["user"],
    queryFn: showUserApi,
  });
  return <div>{data.username}</div>;
}
