"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import {
	Bar,
	BarChart,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts"
import { useExpense } from "@/context/expense-context"
import { useIncome } from "@/context/income-context"

export default function FinancialDashboard() {
	const { expenses } = useExpense()
	const { incomes } = useIncome()

	console.log(expenses, "EXPENSES")

	const parseDate = (dateString: string) => {
		const [day, month, year] = dateString.split("/").map(Number)
		return new Date(year, month - 1, day)
	}

	const monthlyData = Array.from({ length: 12 }, (_, i) => {
		const month = new Date(2024, i, 1).toLocaleString("tr-TR", {
			month: "short",
		})
		const monthExpenses = expenses.filter(
			(e) => parseDate(e.date).getMonth() === i
		)
		const monthIncomes = incomes.filter(
			(income) => parseDate(income.date).getMonth() === i
		)
		return {
			month,
			expenses: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
			income: monthIncomes.reduce((sum, i) => sum + i.amount, 0),
		}
	})

	const expenseColors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
	]

	const expenseCategoriesData = Object.entries(
		expenses.reduce((acc, expense) => {
			acc[expense.category] =
				(acc[expense.category] || 0) + expense.amount
			return acc
		}, {} as Record<string, number>)
	).map(([name, value], index) => ({
		name,
		value,
		fill: expenseColors[index % expenseColors.length],
	}))

	const incomeColors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
	]

	const incomeCategoriesData = Object.entries(
		incomes.reduce((acc, income) => {
			acc[income.category] = (acc[income.category] || 0) + income.amount
			return acc
		}, {} as Record<string, number>)
	).map(([name, value], index) => ({
		name,
		value,
		fill: incomeColors[index % incomeColors.length],
	}))

	const recentTransactions = [...expenses, ...incomes]
		.sort(
			(a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
		)
		.slice(0, 10)
		.map((t) => ({
			...t,
			type: "amount" in t ? "Expense" : "Income",
			value: t.amount * ("amount" in t ? -1 : 1),
		}))

	return (
		<div className="container mx-auto p-4 space-y-4">
			<h1 className="text-3xl font-bold mb-4">
				Finansal Gösterge Paneli
			</h1>

			<Card>
				<CardHeader>
					<CardTitle>Aylık Giderler ve Gelirler</CardTitle>
					<CardDescription>
						Son 12 ayın gider ve gelir karşılaştırması
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={{
							expenses: {
								label: "Giderler",
								color: "hsl(var(--chart-1))",
							},
							income: {
								label: "Gelir",
								color: "hsl(var(--chart-2))",
							},
						}}
						className="h-[300px]"
					>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={monthlyData}>
								<XAxis dataKey="month" />
								<YAxis />
								<Bar
									dataKey="expenses"
									fill="var(--color-expenses)"
								/>
								<Bar
									dataKey="income"
									fill="var(--color-income)"
								/>
								<ChartTooltip
									content={<ChartTooltipContent />}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Gider Kategorileri</CardTitle>
						<CardDescription>
							Kategoriye göre gider dağılımı
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={Object.fromEntries(
								Object.entries(expenseCategoriesData).map(
									([key], index) => [
										key,
										{
											label: key,
											color: expenseColors[
												index % expenseColors.length
											],
										},
									]
								)
							)}
							className="h-[300px]"
						>
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={expenseCategoriesData}
										dataKey="value"
										nameKey="name"
										label
										fill="#8884d8"
									/>
									<ChartTooltip
										content={<ChartTooltipContent />}
									/>
								</PieChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>

				{incomeCategoriesData.length > 0 ? (
					<Card>
						<CardHeader>
							<CardTitle>Gelir Kategorileri</CardTitle>
							<CardDescription>
								Kategoriye göre gelir dağılımı
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={Object.fromEntries(
									Object.entries(incomeCategoriesData).map(
										([key], index) => [
											key,
											{
												label: key,
												color: incomeColors[
													index % incomeColors.length
												],
											},
										]
									)
								)}
								className="h-[300px]"
							>
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={incomeCategoriesData}
											dataKey="value"
											nameKey="name"
											label
											fill="#8884d8"
										/>
										<ChartTooltip
											content={<ChartTooltipContent />}
										/>
									</PieChart>
								</ResponsiveContainer>
							</ChartContainer>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle>Gelir Kategorileri</CardTitle>
							<CardDescription>
								Henüz gelir verisi bulunmamaktadır.
							</CardDescription>
						</CardHeader>
					</Card>
				)}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Son İşlemler</CardTitle>
					<CardDescription>
						En son gider ve gelirlerin zaman çizelgesi
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={{
							value: {
								label: "Tutar",
								color: "hsl(var(--chart-1))",
							},
						}}
						className="h-[300px]"
					>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={recentTransactions}>
								<XAxis dataKey="date" />
								<YAxis />
								<Line
									type="monotone"
									dataKey="value"
									stroke="var(--color-value)"
								/>
								<ChartTooltip
									content={({ payload }) => {
										if (payload && payload.length) {
											const data = payload[0].payload
											return (
												<div className="bg-background p-2 rounded shadow">
													<p className="font-bold">
														{data.date}
													</p>
													<p>{data.title}</p>
													<p
														className={
															data.type ===
															"Expense"
																? "text-red-500"
																: "text-green-500"
														}
													>
														{data.type === "Expense"
															? "Gider"
															: "Gelir"}
														:{Math.abs(data.value)}{" "}
														₺
													</p>
												</div>
											)
										}
										return null
									}}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	)
}
