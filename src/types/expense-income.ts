export type Expense = {
	id: string
	title: string
	description: string
	amount: number
	date: string
	category: string
}

export type ExpenseCategory = {
	id: number
	name: string
}

export type Income = {
	id: string
	title: string
	description: string
	amount: number
	date: string
	category: string
}

export type IncomeCategory = {
	id: number
	name: string
}
