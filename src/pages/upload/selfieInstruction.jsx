'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from "../../components/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';

export default function SelfieInstructions({ closeModal, uploadImageData }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	const handleTakeSelfie = () => {
		closeModal();
		uploadImageData();
	};
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-2xl bg-[#3B4374] rounded-3xl p-6 relative">
				<div className="space-y-8">
					<h1 className="text-white text-3xl font-semibold text-center">
						Selfie Instructions
					</h1>

					<div className="flex justify-center items-center gap-4 py-4">
						<div
							className={`w-10 h-10 rounded-full ${currentStep === 1 ? 'bg-white text-[#3B4374]' : 'bg-white/30 text-white'} flex items-center justify-center font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] cursor-pointer`}
							onClick={() => setCurrentStep(1)}
						>
							1
						</div>
						<div className="w-24 border-t-2 border-dashed border-white/40"></div>
						<div
							className={`w-10 h-10 rounded-full ${currentStep === 2 ? 'bg-white text-[#3B4374]' : 'bg-white/30 text-white'} flex items-center justify-center font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)] cursor-pointer`}
						>
							2
						</div>
					</div>

					{currentStep === 1 ? (
						<div className="space-y-4">
							<div className="mb-8">
								<h2 className="text-xl font-semibold text-white mb-2">
									Find the Best Light
								</h2>
								<p className="text-gray-300 mb-4">
									Bright, even lighting makes all the difference!
								</p>
								<ul className="text-gray-300 space-y-2 list-disc list-inside mb-6">
									<li>Face towards a natural light source like a window.</li>
									<li>Avoid shadows or bright light from behind.</li>
								</ul>
							</div>
							<div className="grid grid-cols-2 gap-4 mb-8">
								<div className="relative">
									<Image
										src="/assets/images/boy.webp"
										alt="Good lighting example"
										width={200}
										height={200}
										className="rounded-lg w-full"
									/>
									<CheckCircle2 className="absolute top-2 right-2 w-6 h-6 text-green-500" />
								</div>
								<div className="relative">
									<Image
										src="/assets/images/boy.webp"
										alt="Poor lighting example"
										width={200}
										height={200}
										className="rounded-lg w-full brightness-75"
									/>
									<XCircle className="absolute top-2 right-2 w-6 h-6 text-red-500" />
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-8">
							<div className="space-y-4">
								<h2 className="text-white text-2xl font-semibold">
									Keep Your Face Centered
								</h2>
								<p className="text-white/90 text-lg">
									Hold your phone at eye level and center your face in the frame.
								</p>
								<ul className="text-[#B8B9CF] space-y-2 list-disc pl-5">
									<li>Look directly at the camera.</li>
									<li>Keep the phone steady to avoid blur.</li>
								</ul>
							</div>
							<div className="space-y-4">
								<p className="text-white text-center">Align your face here</p>
								<div className="max-w-[300px] mx-auto">
									<div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/20">
										<Image
											src="/assets/images/boy.webp"
											alt="Face alignment area"
											fill
											className="object-cover"
										/>
										<div className="absolute inset-0 top-[-1rem] flex items-center justify-center">
											<div className="w-[80%] h-[80%] rounded-full border-4 border-dashed border-white/60 pointer-events-none" />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="flex items-center justify-between gap-4 pt-4">
						<Button
							variant="link"
							className="text-white hover:text-white/80"
							onClick={() => closeModal()}
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
