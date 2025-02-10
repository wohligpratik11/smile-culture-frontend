"use client"

import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div

				className="p-6 space-y-6 text-center bg-[#1e2344] rounded-lg flex flex-col justify-center items-center h-[83%] w-[83%] "
			>
				<h1 className="text-2xl font-medium">Generating, Please Hold On...</h1>

				<div className="py-12">
					<Loader2 className="w-12 h-12 text-[#e94e77] animate-spin mx-auto" />
				</div>

				<div className="space-y-2">
					<p className="text-lg">This may take a moment. Feel free to work on other tasks while we complete the process.</p>
				</div>
			</div>
		</div>
	)
}
