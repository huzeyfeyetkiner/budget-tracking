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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format, parse } from "date-fns"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useExpense } from "@/context/expense-context"
import { useState } from "react"

const expenseFormSchema = z.object({
	title: z
		.string()
		.min(3, {
			message: "Masraf başlığı en az 3 karakter olmalıdır.",
		})
		.max(255, {
			message: "Masraf başlığı en fazla 255 karakter olmalıdır.",
		}),
	description: z
		.string()
		.min(3, {
			message: "Masraf açıklaması en az 3 karakter olmalıdır.",
		})
		.max(255, {
			message: "Masraf açıklaması en fazla 255 karakter olmalıdır.",
		}),
	amount: z.number().min(0, {
		message: "Masraf miktarı sıfırdan büyük olmalıdır.",
	}),
	date: z
		.string()
		.regex(
			/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
			"Geçerli bir tarih giriniz. (GG/AA/YYYY)"
		),
	category: z.string().min(1, {
		message: "Masraf kategorisi seçilmelidir.",
	}),
})

export function ExpenseForm() {
	const { addExpense } = useExpense()
	const [open, setOpen] = useState(false)

	const expenseForm = useForm<z.infer<typeof expenseFormSchema>>({
		resolver: zodResolver(expenseFormSchema),
		defaultValues: {
			title: "",
			description: "",
			amount: 0,
			date: "",
			category: "",
		},
	})

	function onSubmit(values: z.infer<typeof expenseFormSchema>) {
		const date = parse(values.date, "dd/MM/yyyy", new Date())
		const formattedDate = format(date, "dd/MM/yyyy")

		const expense = {
			...values,
			id: Math.random().toString(36).substr(2, 9),
			date: formattedDate,
		}

		addExpense(expense)
		expenseForm.reset()
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
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button type="button" variant="default">
						Masraf Gir
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Masraf Girme Formu</DialogTitle>
						<DialogDescription>
							Aşağıdaki formu doldurarak masraf girişi
							yapabilirsiniz.
						</DialogDescription>
					</DialogHeader>
					<Form {...expenseForm}>
						<form
							onSubmit={expenseForm.handleSubmit(onSubmit)}
							className="space-y-1"
						>
							<FormField
								control={expenseForm.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Masraf Başlığı</FormLabel>
										<FormControl>
											<Input
												placeholder="Masraf için başlık giriniz"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={expenseForm.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Masraf Açıklaması</FormLabel>
										<FormControl>
											<Input
												placeholder="Masraf için açıklama giriniz"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={expenseForm.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Masraf Miktarı</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Masraf miktarı giriniz (₺)"
												value={field.value}
												onChange={(e) =>
													field.onChange(
														Number(e.target.value)
													)
												}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={expenseForm.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Masraf Tarihi</FormLabel>
										<FormControl>
											<Input
												value={field.value}
												onChange={(e) =>
													handleDateChange(
														e,
														field.onChange
													)
												}
												placeholder="Masraf tarihi giriniz (GG/AA/YYYY)"
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={expenseForm.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Masraf Kategorisi</FormLabel>
										<FormControl>
											<Input
												placeholder="Masraf kategorisi seçiniz"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<DialogFooter className="py-3">
								<Button type="submit">Masrafı Kaydet</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
