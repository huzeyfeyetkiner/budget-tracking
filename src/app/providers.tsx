"use client"

import { ExpenseProvider } from "@/context/expense-context"
import { IncomeProvider } from "@/context/income-context"
import React from "react"

function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ExpenseProvider>
			<IncomeProvider>{children}</IncomeProvider>
		</ExpenseProvider>
	)
}

export default Provider
