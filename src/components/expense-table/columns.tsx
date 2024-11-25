"use client"

import { Expense } from "@/types/expense-income"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"

export const columns: ColumnDef<Expense>[] = [
	{
		accessorKey: "title",
		header: "Başlık",
	},
	{
		accessorKey: "category",
		header: "Kategori",
	},
	{
		accessorKey: "amount",
		header: "Miktar",
		cell: ({ row }) => {
			return <span>{row.original.amount} TL</span>
		},
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="link"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Tarih
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
]
