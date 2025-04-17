'use client';

import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/datePicker";
import { Button } from "@/components/ui/button";
import { TableComponent } from "@/components/table";
import { useState } from "react";

const tableHeaders = ["Name", "Email", "Phone Number", "Timings", "Status", "Actions"];

const dummyTableBody = [
  {
    _id: "1",
    rowData: [
      "John Doe",
      "john@example.com",
      "+1 123-456-7890",
      ["10:00 AM - 11:00 AM"],
      "Confirmed",
    ],
  },
  {
    _id: "2",
    rowData: [
      "Jane Smith",
      "jane@example.com",
      "+44 789-456-1230",
      ["02:00 PM - 03:00 PM"],
      "Pending",
    ],
  },
  {
    _id: "3",
    rowData: [
      "Ali Khan",
      "ali@example.com",
      "+91 99876-54321",
      ["11:30 AM - 12:30 PM"],
      "Cancelled",
    ],
  },
];

export default function Provider() {
    const [activeRowId, setActiveRowId] = useState(null);
    const [modalPosition, setModalPosition] = useState(null);
  return (
    <div className="w-full px-6 py-4 bg-white shadow">
      <div className="flex gap-4 items-center justify-start mt-10 flex-wrap">
        <Input type="text" placeholder="Search" className="w-[300px]" />
        <DatePickerDemo className="w-[300px]" />
        <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded cursor-pointer">
          Search
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold my-5">Booking Details</h1>
        <TableComponent 
          THead={tableHeaders}
          TBody={dummyTableBody}
          activeRowId={activeRowId}
          setActiveRowId={setActiveRowId}
          modalPosition={modalPosition}
          setModalPosition={setModalPosition}
        />
      </div>
    </div>
  );
}
