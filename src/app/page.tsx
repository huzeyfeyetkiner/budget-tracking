"use client"

import StatCard from "@/components/cards/stat-card"
import { ExpenseForm } from "@/components/forms/expense-form"
import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { useExpense } from "@/context/expense-context"

export default function Home() {
	const { expenses } = useExpense()

	return (
		<div className="flex flex-1 flex-col bg-background space-y-5">
			<div className="grid grid-cols-4 gap-4">
				<StatCard />
			</div>

			<ExpenseForm />

			<DataTable columns={columns} data={expenses} />
		</div>
	)
}
