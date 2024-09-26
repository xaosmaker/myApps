import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationTypes } from "../types/componentTypes/paginationTypes";
const active = " bg-slate-950 ";
const defaultStyle = " rounded-md px-4 py-2 hover:bg-slate-950 ";
const totalPagination = 2;

function Pagination({ currentPage, totalPages }: PaginationTypes) {
  const [pageNumber, setPageNumber] = useSearchParams();

  function onClickPaginationButton(pageNumber: string) {
    setPageNumber({ page: pageNumber });
  }
  const renderArrows = totalPages > 5;
  function renderPaginationList() {
    const renderer: Array<React.ReactElement> = [];
    const beforeActive = currentPage - totalPagination;
    for (let i = beforeActive; i < currentPage; i++) {
      if (i > 0) {
        renderer.push(
          <li
            className={
              (i === Number(pageNumber) ? active : null) + defaultStyle
            }
            onClick={() => onClickPaginationButton(i.toString())}
            key={i}
          >
            {i}
          </li>
        );
      }
    }

    for (let i = currentPage; i < currentPage + totalPagination + 1; i++) {
      if (i <= totalPages) {
        renderer.push(
          <li
            className={(i === currentPage ? active : null) + defaultStyle}
            key={i}
            onClick={() => onClickPaginationButton(i.toString())}
          >
            {i}
          </li>
        );
      }
    }
    return renderer;
  }

  useEffect(() => {
    if (totalPages > 1) {
      setPageNumber({ page: currentPage.toString() });
    }
  }, [currentPage, setPageNumber, totalPages]);

  if (totalPages === 1 && currentPage === 1) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center justify-end p-4 text-xl">
      {renderArrows && currentPage > 1 ? (
        <>
          <li
            onClick={() => onClickPaginationButton("1")}
            className={defaultStyle}
          >
            &lt;&lt;
          </li>
          <li
            onClick={() =>
              onClickPaginationButton((currentPage - 1).toString())
            }
            className={defaultStyle}
          >
            {" "}
            &lt;{" "}
          </li>
        </>
      ) : null}
      {renderPaginationList()}

      {renderArrows && currentPage < totalPages ? (
        <>
          <li
            onClick={() =>
              onClickPaginationButton((currentPage + 1).toString())
            }
            className={defaultStyle}
          >
            &gt;
          </li>
          <li
            onClick={() => onClickPaginationButton(totalPages.toString())}
            className={defaultStyle}
          >
            {" "}
            &gt;&gt;{" "}
          </li>
        </>
      ) : null}
    </ul>
  );
}

export default Pagination;
