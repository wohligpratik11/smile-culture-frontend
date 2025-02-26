'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from "../../components/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';

export default function SelfieInstructions({ closeModal, uploadImageData }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [isVisible, setIsVisible] = useState(true);

	const handleBackdropClick = (e) => {
		if (e.target.id === 'backdrop') {
			closeModal();
		}
	};

	const handleTakeSelfie = () => {
		closeModal();
		uploadImageData();
	};

	if (!isVisible) return null;

	return (
		<div
			id="backdrop"
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
			onClick={handleBackdropClick}
		>
			<div
				className="w-full max-w-2xl bg-[#3B4374] rounded-3xl p-4 relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<div className="absolute top-4 right-4">
					<button onClick={closeModal} className="text-white">
						<XCircle className="w-6 h-6" />
					</button>
				</div>

				<div className="space-y-4">
					<h1 className="text-white text-2xl font-medium text-center">
						Selfie Instructions
					</h1>

					<div className="flex justify-center items-center gap-4">
						<div
							className={`w-10 h-10 rounded-full ${currentStep === 1
								? 'bg-white text-[#3B4374]'
								: 'bg-white/30 text-white'
								} flex items-center justify-center font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] cursor-pointer`}
						>
							1
						</div>
						<div className="w-24 border-t-2 border-dashed border-white/40"></div>
						<div
							className={`w-10 h-10 rounded-full ${currentStep === 2
								? 'bg-white text-[#3B4374]'
								: 'bg-white/30 text-white'
								} flex items-center justify-center font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] cursor-pointer`}
						>
							2
						</div>
					</div>

					{/* Content for Step 1 */}
					{currentStep === 1 ? (
						<div className="space-y-4">
							<div className="mb-8">
								<h2 className="text-xl font-semibold text-white mb-2">
									Find the Best Light
								</h2>
								<p className="text-gray-300 mb-4">
									Bright, even lighting makes all the difference!
								</p>
								<ul className="text-[#B8B9CF] space-y-2 list-disc list-inside mb-6">
									<li>Face towards a natural light source like a window.</li>
									<li>Avoid shadows or bright light from behind.</li>
								</ul>
							</div>
							<div className="flex justify-center gap-4 mb-8">
								<div className="relative w-full aspect-square">
									<img
										src="/assets/images/boy.webp"
										alt="Good lighting example"
										className="rounded-lg w-full h-full object-cover"
									/>
									<div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
										<CheckCircle2 className="w-5 h-5 text-white" />
									</div>
								</div>
								<div className="relative w-full aspect-square">
									<img
										src="/assets/images/boy.webp"
										alt="Poor lighting example"
										className="rounded-lg w-full h-full object-cover brightness-50"
									/>
									<div className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
										<XCircle className="w-5 h-5 text-white" />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<div className="mb-8">
								<h2 className="text-xl font-semibold text-white mb-2">
									Keep Your Face Centered
								</h2>
								<p className="text-gray-300 mb-4">
									Hold your phone at eye level and center your face in the frame.
								</p>
								<ul className="text-[#B8B9CF] space-y-2 list-disc list-inside mb-6">
									<li>Look directly at the camera.</li>
									<li>Keep the phone steady to avoid blur.</li>
								</ul>
							</div>
							<div className="flex justify-center mb-8">
								<div className="relative w-full max-w-xs aspect-square mx-auto">
									<img
										src="/assets/images/boy.webp"
										alt="Good lighting example"
										className="rounded-lg w-full h-full object-cover"
									/>
									<div className="absolute inset-0 border-4 border-dashed border-white rounded-full m-4" />
								</div>
							</div>
						</div>
					)}

					<div className="flex items-center justify-between gap-4 pt-2">
						<Button
							variant="link"
							className="text-white hover:text-white/80"
							onClick={() => {
								closeModal();
								handleTakeSelfie();
							}}
						>
							Skip
						</Button>

						{currentStep === 1 && (
							<Button
								className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-white"
								onClick={() => setCurrentStep(2)}
							>
								Next
							</Button>
						)}
						{currentStep === 2 && (
							<div className="flex gap-4">
								<Button
									variant="outline"
									className="border-[#5D6494] text-white hover:bg-[#5D6494] hover:text-white"
									onClick={() => setCurrentStep(1)}
								>
									Previous
								</Button>
								<Button
									className="bg-[#22D3EE] hover:bg-[#22D3EE]/90 text-white"
									onClick={handleTakeSelfie}
								>
									Take Selfie
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
