"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format, parse } from "date-fns"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { categories } from "@/constants/categories"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useIncome } from "@/context/income-context"

const incomeFormSchema = z.object({
	title: z
		.string()
		.min(3, {
			message: "Gelir başlığı en az 3 karakter olmalıdır.",
		})
		.max(255, {
			message: "Gelir başlığı en fazla 255 karakter olmalıdır.",
		}),
	description: z
		.string()
		.min(3, {
			message: "Gelir açıklaması en az 3 karakter olmalıdır.",
		})
		.max(255, {
			message: "Gelir açıklaması en fazla 255 karakter olmalıdır.",
		}),
	amount: z.coerce.number().positive({
		message: "Gelir miktarı pozitif bir sayı olmalıdır.",
	}),
	date: z
		.string()
		.regex(
			/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
			"Geçerli bir tarih giriniz. (GG/AA/YYYY)"
		),
	category: z.string().min(1, {
		message: "Gelir kategorisi seçilmelidir.",
	}),
})

export function IncomeForm() {
	const { addIncome, incomes } = useIncome()
	const [open, setOpen] = useState(false)

	const incomeForm = useForm<z.infer<typeof incomeFormSchema>>({
		resolver: zodResolver(incomeFormSchema),
		defaultValues: {
			title: "",
			description: "",
			amount: 0,
			date: "",
			category: "",
		},
	})

	function onSubmit(values: z.infer<typeof incomeFormSchema>) {
		const date = parse(values.date, "dd/MM/yyyy", new Date())
		const formattedDate = format(date, "dd/MM/yyyy")

		const income = {
			...values,
			id: Math.random().toString(36).substr(2, 9),
			date: formattedDate,
		}

		console.log(income)
		console.log("incomes", incomes)

		addIncome(income)
		incomeForm.reset()
		setOpen(false)
	}

	const formatDateString = (value: string) => {
		value = value.replace(/\D/g, "")

		if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2)
		if (value.length > 5)
			value = value.slice(0, 5) + "/" + value.slice(5, 9)

		return value.slice(0, 10)
	}

	const handleDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string) => void
	) => {
		const formattedValue = formatDateString(event.target.value)
		onChange(formattedValue)
	}

	return (
		<div className="w-full">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="w-full" type="button" variant="default">
						Gelir Gir
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Gelir Girme Formu</DialogTitle>
						<DialogDescription>
							Aşağıdaki formu doldurarak gelir girişi
							yapabilirsiniz.
						</DialogDescription>
					</DialogHeader>
					<Form {...incomeForm}>
						<form
							onSubmit={incomeForm.handleSubmit(onSubmit)}
							className="space-y-1"
						>
							<FormField
								control={incomeForm.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gelir Başlığı</FormLabel>
										<FormControl>
											<Input
												placeholder="Gelir için başlık giriniz"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={incomeForm.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gelir Açıklaması</FormLabel>
										<FormControl>
											<Input
												placeholder="Gelir için açıklama giriniz"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={incomeForm.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gelir Miktarı</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Gelir miktarı giriniz (₺)"
												{...field}
												onChange={(e) =>
													field.onChange(
														e.target.valueAsNumber
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={incomeForm.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gelir Tarihi</FormLabel>
										<FormControl>
											<Input
												value={field.value}
												onChange={(e) =>
													handleDateChange(
														e,
														field.onChange
													)
												}
												placeholder="Gelir tarihi giriniz (GG/AA/YYYY)"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={incomeForm.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gelir Kategorisi</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Gelir kategorisi seçiniz" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map(
													(category, index) => (
														<SelectItem
															key={index}
															value={
																category.name
															}
														>
															{category.name}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className="py-3">
								<Button type="submit">Geliri Kaydet</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
