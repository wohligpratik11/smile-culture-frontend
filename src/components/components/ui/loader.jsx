"use client"

import { Loader2 } from "lucide-react"

export default function LoadingScreen({ remainingTime }) {
	return (
		<div className="h-[83%] w-[83%] rounded-2xl flex flex-col items-center justify-center bg-[#1e2344] text-white p-4">
			<div className="w-full max-w-md space-y-6 text-center">
				<h1 className="text-2xl font-medium">Generating...</h1>

				<p className="text-lg text-gray-300">Estimated wait time: {remainingTime}s</p>

				<div className="py-12">
					<Loader2 className="w-12 h-12 text-[#e94e77] animate-spin mx-auto" />
				</div>

				<div className="space-y-2">
					<p className="text-lg">You can work on other projects, or</p>
					<a
						href="#"
						className="text-lg text-[#64b5f6] hover:text-[#90f9d6] transition-colors inline-flex items-center gap-1"
					>
						Explore the Community {">"}
					</a>
				</div>
			</div>
		</div>
	)
}

