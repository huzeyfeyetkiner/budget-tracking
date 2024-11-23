import React from "react"
import { ModeToggle } from "../theme/theme-toggle"
import { SidebarTrigger } from "../ui/sidebar"

function AppHeader() {
	return (
		<div className="w-full flex flex-row items-center justify-between py-3 px-1 bg-sidebar border-b border-b-sidebar-border">
			<SidebarTrigger />
			<ModeToggle />
		</div>
	)
}

export default AppHeader
