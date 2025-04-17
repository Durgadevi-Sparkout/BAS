"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { CustomPagination } from "./CustomPagination";
import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export const TableComponent = ({
  THead = [],
  TBody = [],
  loading = false,
  editableAccessColumn = false,
  hasPagination = false,
  classname,
  currentPage,
  totalPages,
  hasNextPage = false,
  hasPreviousPage = false,
  onPageChange,
  limit,
  activeRowId,
  setActiveRowId,
  modalPosition,
  setModalPosition,
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setActiveRowId(null);
            setModalPosition(null);
          }
        };
    
        if (activeRowId !== null) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [activeRowId]);

  const openModal = (event, id) => {
    const rect = event.target.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const modalHeight = 150;

    let topPosition = rect.bottom + window.scrollY;
    if (topPosition + modalHeight > windowHeight) {
      topPosition = rect.top + window.scrollY - 130;
    }

    setModalPosition({
      top: topPosition,
      left: rect.left + window.scrollX - 160,
    });

    setActiveRowId(id);
  };

  const paginatedData = TBody;

  return (
    <div className="border-2 border-[#fff6] relative rounded-xl md:rounded-2xl">
      <Table className="TableWrap rounded-xl md:rounded-2xl">
        <TableHeader className="sticky top-0 bg-blue-800 text-xs text-gray-700 dark:text-gray-400 z-10 shadow-x rounded-xl md:rounded-2xl">
          <TableRow className="border-b border-[#ffffff66] hover:bg-[var(--color-primary-hover)]">
            {THead.map((header, index) => (
              <TableHead
                key={index}
                scope="col"
                className="text-white p-4 md:px-6 md:py-5 text-base md:text-lg"
              >
                {header}
              </TableHead>
            ))}
            <TableHead className="text-white p-4 md:px-6 md:py-5 text-base lg:text-lg"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white-transparent-100 rounded-lg border-separate">
          {loading ? (
            <TableRow className="border-b border-[#ffffff66] hover:bg-transparent">
              <TableCell
                colSpan={THead.length + 1}
                className="text-center py-4"
              >
                <Loader />
              </TableCell>
            </TableRow>
          ) : paginatedData.length > 0 ? (
            paginatedData.map(({ _id, rowData }, rowIndex) => (
              <TableRow
                key={_id || rowIndex}
                className="border-b border-[#ffffff66] hover:bg-transparent"
              >
                {rowData.map((cell, colIndex) => (
                  <TableCell key={colIndex} className="p-4 md:px-6 md:py-5">
                    {editableAccessColumn && colIndex === 3 ? (
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(cell)
                          ? cell.map((item, i) => (
                              <span
                                key={i}
                                className="bg-[#0b86de4d] text-[#6dc2ff] px-2 py-1 rounded-md text-sm"
                              >
                                {item}
                              </span>
                            ))
                          : cell}
                      </div>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
                <TableCell className="p-4 md:px-6 md:py-5 text-center relative">
                  <span
                    className="w-6 h-6 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-300 text-xl border-2 border-[#ffffff2e] rounded-md hover:border-gray-300 transition-all duration-300"
                    onClick={(e) => openModal(e, _id)}
                  >
                    ⋮
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={THead.length + 1}
                className="p-4 md:px-6 md:py-5 text-center text-gray-400 hover:bg-transparent"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* {hasPagination && !loading && (
        <CustomPagination
          currentPage={currentPage ?? 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
          classname={classname}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          limit={limit && limit > 0 ? (limit > 1 ? limit : 10) : undefined}
        />
      )} */}

      {activeRowId &&
        modalPosition &&
        createPortal(
          <div
            ref={modalRef}
            id="row-menu"
            className="absolute z-50 shadow-md rounded-lg min-w-[150px]"
            style={{
              position: "absolute",
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
            }}
          >
            {/* <ManageRowModal
              rowIndex={TBody.findIndex((row) => row._id === activeRowId)}
              handleActionClick={handleActionClick}
            /> */}
            action
          </div>,
          document.body
        )}
    </div>
  );
};
