import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
} from "react";
interface ContextTypes {
  tableCols: string;
  tableHeight: string;
}
const TableContext = createContext<ContextTypes>({
  tableCols: "",
  tableHeight: "",
});

// TODO: implement Search functionality
// TODO: implemeng filter functionality
/**
 *@param {string} tableHeight - this is the overall heigh and should be in tailwind like: h-96.
 *@param {string} tableCols - this is in tailwind and is a set of grid like grid-rows-6 or cols-6 gap grid is already defined.
 */
export default function Table({
  tableCols,
  tableHeight,
  children,
}: {
  tableCols: string;
  tableHeight: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ tableCols, tableHeight }}>
      <div role="table" className={` ${tableHeight} text-xs md:text-base `}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

function TableHeader({ children }: { children: ReactElement[] }) {
  const { tableCols } = useContext(TableContext);
  return (
    <div
      className={`${tableCols}  grid items-center  bg-slate-950 px-4 py-2 font-bold  uppercase`}
    >
      {children}
    </div>
  );
}

function TableBody({ children }: { children: ReactNode[] }) {
  const { tableHeight } = useContext(TableContext);
  return <div className={` overflow-x-auto  ${tableHeight}`}>{children}</div>;
}
function TableRow({ children }: { children: ReactElement[] }) {
  const { tableCols } = useContext(TableContext);
  return (
    <div
      className={`${tableCols} grid items-center px-4 py-1   capitalize  odd:bg-slate-800  `}
      role="row"
    >
      {children}
    </div>
  );
}

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Body = TableBody;
