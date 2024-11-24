"use client"

import { ExpenseProvider } from "@/context/expense-context"
import React from "react"

function Provider({ children }: { children: React.ReactNode }) {
	return <ExpenseProvider>{children}</ExpenseProvider>
}

export default Provider
