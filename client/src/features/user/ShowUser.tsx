import { useQuery } from "@tanstack/react-query";
import React from "react";
import { showUser } from "../../services/authApiCalls";

export default function ShowUser() {
  const { data = {} } = useQuery({
    queryKey: ["user"],
    queryFn: showUser,
  });
  return <div>{data.username}</div>;
}
