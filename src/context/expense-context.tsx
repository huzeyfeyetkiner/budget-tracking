import { Expense } from "@/types/expense"

import { createContext, useContext, useEffect, useState } from "react"

const ExpenseContext = createContext<{
	expenses: Expense[]
	setExpenses: (expenses: Expense[]) => void
	addExpense: (expense: Expense) => void
	deleteExpense: (id: string) => void
}>({
	expenses: [],
	setExpenses: () => {},
	addExpense: () => {},
	deleteExpense: () => {},
})

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
	const [expenses, setExpenses] = useState<Expense[]>([])

	useEffect(() => {
		const expenses = localStorage.getItem("expenses")
		if (expenses && expenses?.length > 0) {
			setExpenses(JSON.parse(expenses))
		}
	}, [])

	function addExpense(expense: Expense) {
		setExpenses((prev) => {
			const updatedExpenses = [...prev, expense]
			localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
			return updatedExpenses
		})
	}

	function deleteExpense(id: string) {
		setExpenses((prev) => {
			const updatedExpenses = prev.filter((expense) => expense.id !== id)
			localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
			return updatedExpenses
		})
	}

	const values = {
		expenses,
		setExpenses,
		addExpense,
		deleteExpense,
	}

	return (
		<ExpenseContext.Provider value={values}>
			{children}
		</ExpenseContext.Provider>
	)
}

export function useExpense() {
	return useContext(ExpenseContext)
}
