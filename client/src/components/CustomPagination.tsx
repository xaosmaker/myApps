import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";
import type { PaginationTypes } from "@/types/componentTypes/paginationTypes";
import {
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
const PAGE_NUMBER_SHOW = 3;

function pagesPaginationList(curentPage: number, totalPages: number) {
  const PAGE_NUMBER_BERORE = (PAGE_NUMBER_SHOW - 1) / 2;
  const pagesNumber: number[] = [];

  const minPageNumber = curentPage - PAGE_NUMBER_BERORE;
  const start = minPageNumber > 0 ? minPageNumber : 1;

  if (curentPage === totalPages) {
    for (let i = curentPage; i > 0; i--) {
      pagesNumber.push(i);
      if (pagesNumber.length === 3) {
        break;
      }
    }
  } else {
    for (let i = start; i <= totalPages; i++) {
      pagesNumber.push(i);
      if (pagesNumber.length === PAGE_NUMBER_SHOW) {
        break;
      }
    }
  }
  return pagesNumber.sort();
}

export default function CustomPagination({
  currentPage,
  totalPages,
}: PaginationTypes) {
  const renderPages = pagesPaginationList(currentPage, totalPages);
  const [pageNumber, setPageNumber] = useSearchParams();

  const nextPageHandle = (nextPageNumber: string) => () => {
    if (nextPageNumber === "+1") {
      if (currentPage !== totalPages) {
        pageNumber.set("page", (currentPage + 1).toString());
        setPageNumber(pageNumber);
      }
    } else if (nextPageNumber === "-1") {
      if (currentPage > 1) {
        pageNumber.set("page", (currentPage - 1).toString());
        setPageNumber(pageNumber);
      }
    } else {
      pageNumber.set("page", nextPageNumber);
      setPageNumber(pageNumber);
    }
  };

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        {currentPage !== 1 && (
          <>
            <PaginationLink onClick={nextPageHandle("1")}>
              <ChevronsLeft />
            </PaginationLink>

            <PaginationLink onClick={nextPageHandle("-1")}>
              <ChevronLeft />
            </PaginationLink>
          </>
        )}

        {renderPages.map((item) => (
          <PaginationLink
            key={item}
            onClick={nextPageHandle(item.toString())}
            isActive={item === currentPage}
          >
            {item}
          </PaginationLink>
        ))}

        {currentPage !== totalPages && (
          <>
            <PaginationLink onClick={nextPageHandle("+1")}>
              <ChevronRight />
            </PaginationLink>

            <PaginationLink onClick={nextPageHandle(totalPages.toString())}>
              <ChevronsRight />
            </PaginationLink>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
