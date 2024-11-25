"use client"

import { Income } from "@/types/expense-income"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Income>[] = [
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
