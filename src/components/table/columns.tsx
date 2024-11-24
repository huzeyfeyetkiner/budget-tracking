"use client"

import { Expense } from "@/types/expense"
import { ColumnDef } from "@tanstack/react-table"

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
	},
]
