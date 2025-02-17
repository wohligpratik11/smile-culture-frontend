"use client"

import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="p-8 space-y-6 text-center bg-[#1e2344] rounded-lg flex flex-col justify-center items-center h-[80%] w-[80%] md:w-[60%] lg:w-[50%]">
				<h1 className="text-3xl md:text-4xl font-semibold text-white">Generating, Please Hold On...</h1>
				<div className="py-8">
					<Loader2
						className="w-16 h-16 animate-spin mx-auto bg-gradient-to-r from-[#87d880] to-[#40adff] text-transparent border-0 bg-clip-border"
					/>
				</div>
				<div className="space-y-3">
					<p className="text-lg md:text-xl text-gray-200">
						This may take a moment. Feel free to work on other tasks while we complete the process.
					</p>
				</div>
			</div>
		</div>
	)
}
