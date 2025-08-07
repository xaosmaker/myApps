import { useSearchParams } from "react-router-dom";

function usePagePaginationParams(): string {
  const [searchParams] = useSearchParams();

  const queryParam: string = "?" + searchParams.toString();

  return queryParam;
}

export default usePagePaginationParams;
