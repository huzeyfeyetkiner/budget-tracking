import { HandCoins } from "lucide-react"
import React from "react"

function StatCard() {
	return (
		<div className="w-full bg-sidebar border border-sidebar-border p-3 rounded-xl">
			<div className="flex flex-col">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-col">
						<span className="text-xs text-sidebar-text-light">
							Total Revenue
						</span>
						<span className="text-xl">₺ 1,00,000</span>
					</div>

					<HandCoins />
				</div>

				{/* <div className="flex justify-between mt-4">
					<span className="text-xs text-sidebar-text-light">
						This Month
					</span>
					<span className="text-xs">+ ₺ 10,000</span>

					<span className="text-xs text-sidebar-text-light">
						Last Month
					</span>
					<span className="text-xs">+ ₺ 5,000</span>

					<span className="text-xs text-sidebar-text-light">
						This Year
					</span>
					<span className="text-xs">+ ₺ 1,00,000</span>
				</div> */}
			</div>
		</div>
	)
}

export default StatCard
