import { useSearchParams } from "react-router-dom";

function usePagePaginationParams(): string {
  const [searchParams] = useSearchParams();
  let queryParam: string = "?";
  for (const [key, value] of searchParams.entries()) {
    queryParam = queryParam + `${key}=${value}&`;
  }
  return queryParam.slice(0, -1);
}

export default usePagePaginationParams;
