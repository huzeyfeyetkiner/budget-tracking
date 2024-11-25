import { Income } from "@/types/expense-income"

import { createContext, useContext, useEffect, useState } from "react"

const IncomeContext = createContext<{
	incomes: Income[]
	setIncomes: (incomes: Income[]) => void
	addIncome: (expense: Income) => void
	deleteIncome: (id: string) => void
	totalIncome: number
}>({
	incomes: [],
	setIncomes: () => {},
	addIncome: () => {},
	deleteIncome: () => {},
	totalIncome: 0,
})

export function IncomeProvider({ children }: { children: React.ReactNode }) {
	const [incomes, setIncomes] = useState<Income[]>([])
	const [totalIncome, setTotalIncome] = useState<number>(0)

	useEffect(() => {
		const incomes = localStorage.getItem("incomes")
		const totalIncome = localStorage.getItem("totalIncome")
		if (incomes && incomes?.length > 0) {
			setIncomes(JSON.parse(incomes))
		}

		if (totalIncome) {
			setTotalIncome(JSON.parse(totalIncome))
		}
	}, [])

	function addIncome(income: Income) {
		setIncomes((prev) => {
			const updatedIncomes = [...prev, income]
			localStorage.setItem("incomes", JSON.stringify(updatedIncomes))
			console.log("Updated incomes:", updatedIncomes)

			return updatedIncomes
		})

		setTotalIncome((prev) => {
			const updatedTotalIncome = prev + income.amount
			localStorage.setItem(
				"totalIncome",
				JSON.stringify(updatedTotalIncome)
			)
			console.log("Updated incomes:", updatedTotalIncome)

			return updatedTotalIncome
		})
	}

	function deleteIncome(id: string) {
		setIncomes((prev) => {
			const updatedIncomes = prev.filter((income) => income.id !== id)
			localStorage.setItem("incomes", JSON.stringify(updatedIncomes))
			return updatedIncomes
		})
	}

	const values = {
		incomes,
		setIncomes,
		addIncome,
		deleteIncome,
		totalIncome,
	}

	return (
		<IncomeContext.Provider value={values}>
			{children}
		</IncomeContext.Provider>
	)
}

export function useIncome() {
	return useContext(IncomeContext)
}
