"use client"

export default function LoadingScreen({ remainingTime }) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="h-screen w-full flex items-center justify-center">
				<div className="h-[70%] w-[60%] rounded-2xl flex flex-col items-center justify-center bg-[#1e2344] text-white p-4 ">
					<div className="w-full max-w-md space-y-6 text-center">
						<h1 className="text-2xl font-medium">Generating, Please Hold On...</h1>

						<div className="py-6">
							{/* Use the image as the loader */}
							<img src="/assets/images/eros.gif" alt="Loading..." className="w-80 h-80 mx-auto" />
						</div>
						<div className="space-y-2">
							<p className="text-lg">This may take a moment. Feel free to work on other tasks while we complete the process.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
