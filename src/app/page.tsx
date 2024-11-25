"use client"

import StatCard from "@/components/cards/stat-card"
import { ExpenseForm } from "@/components/forms/expense-form"
import { IncomeForm } from "@/components/forms/income-form"
import { columns } from "@/components/expense-table/columns"
import { ExpenseTable } from "@/components/expense-table/data-table"
import { useExpense } from "@/context/expense-context"
import { useIncome } from "@/context/income-context"
import { IncomeTable } from "@/components/income-table/data-table"
import { HandCoins, Wallet } from "lucide-react"

export default function Home() {
	const { expenses, totalExpense } = useExpense()
	const { incomes, totalIncome } = useIncome()

	return (
		<div className="flex flex-1 flex-col bg-background space-y-5">
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
				<StatCard
					title="Toplam Harcama"
					value={totalExpense}
					icon={<Wallet />}
				/>
				<StatCard
					title="Toplam Gelir"
					value={totalIncome}
					icon={<HandCoins />}
				/>
			</div>

			<div className="grid grid-cols-2 max-w-xl gap-5">
				<ExpenseForm />
				<IncomeForm />
			</div>

			<ExpenseTable columns={columns} data={expenses} />

			<IncomeTable columns={columns} data={incomes} />
		</div>
	)
}
