import { Expense } from "@/types/expense-income"

import { createContext, useContext, useEffect, useState } from "react"

const ExpenseContext = createContext<{
	expenses: Expense[]
	setExpenses: (expenses: Expense[]) => void
	addExpense: (expense: Expense) => void
	deleteExpense: (id: string) => void
	totalExpense: number
}>({
	expenses: [],
	setExpenses: () => {},
	addExpense: () => {},
	deleteExpense: () => {},
	totalExpense: 0,
})

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
	const [expenses, setExpenses] = useState<Expense[]>([])
	const [totalExpense, setTotalExpense] = useState<number>(0)

	useEffect(() => {
		const expenses = localStorage.getItem("expenses")
		if (expenses && expenses?.length > 0) {
			setExpenses(JSON.parse(expenses))
		}

		const totalExpense = localStorage.getItem("totalExpense")
		if (totalExpense) {
			setTotalExpense(JSON.parse(totalExpense))
		}
	}, [])

	function addExpense(expense: Expense) {
		setExpenses((prev) => {
			const updatedExpenses = [...prev, expense]
			localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
			return updatedExpenses
		})

		setTotalExpense((prev) => {
			const updatedTotalExpense = prev + expense.amount
			localStorage.setItem(
				"totalExpense",
				JSON.stringify(updatedTotalExpense)
			)
			return updatedTotalExpense
		})
	}

	function deleteExpense(id: string) {
		setExpenses((prev) => {
			const updatedExpenses = prev.filter((expense) => expense.id !== id)
			localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
			return updatedExpenses
		})

		setTotalExpense((prev) => {
			const updatedTotalExpense =
				prev - expenses.find((expense) => expense.id === id)!.amount
			localStorage.setItem(
				"totalExpense",
				JSON.stringify(updatedTotalExpense)
			)
			return updatedTotalExpense
		})
	}

	const values = {
		expenses,
		setExpenses,
		addExpense,
		deleteExpense,
		totalExpense,
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
