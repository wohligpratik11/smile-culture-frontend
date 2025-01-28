"use client"

import { Loader2 } from "lucide-react"

export default function LoadingScreen({ remainingTime }) {
	return (
		<div className="h-[83%] w-[83%] rounded-2xl flex flex-col items-center justify-center bg-[#1e2344] text-white p-4">
			<div className="w-full max-w-md space-y-6 text-center">
				<h1 className="text-2xl font-medium">Generating, Please Hold On...</h1>

				<div className="py-12">
					<Loader2 className="w-12 h-12 text-[#e94e77] animate-spin mx-auto" />
				</div>
				<div className="space-y-2">
					<p className="text-lg">This may take a moment. Feel free to work on other tasks while we complete the process.</p>
					<a
						href="https://erosnow.com/login"
						target="_blank"
						rel="noopener noreferrer" // for security reasons
						className="text-lg text-[#64b5f6] hover:text-[#90f9d6] transition-colors inline-flex items-center gap-1"
					>
						Explore the Community {">"}
					</a>
				</div>

			</div>

		</div>
	)
}

