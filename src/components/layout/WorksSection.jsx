import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from "../components/ui/button";
import Image from "next/image";
import {
	Calendar,
	CheckCircle,
	Sparkles,
	Clock,
	Shield,
	CreditCard,
	Award,
	ThumbsUp,
	Star,
	Users,
	BadgeCheck,
	ArrowRight,
	Phone,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const HeroSection = () => {
	const router = useRouter();

	return (
		<div className="relative bg-gradient-to-br from-white via-cyan-50 to-teal-100 py-12 md:py-12 overflow-visible min-h-screen w-full">
			{/* Background Decorative Elements */}
			<div className="absolute inset-0 pointer-events-none z-0">
				<div className="absolute top-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-cyan-200 rounded-full opacity-20 blur-3xl -translate-x-1/2 translate-y-1/4"></div>
				<div className="absolute bottom-0 right-0 w-40 h-40 sm:w-96 sm:h-96 bg-teal-200 rounded-full opacity-20 blur-3xl translate-x-1/4 -translate-y-1/4"></div>
			</div>

			<div className="container mx-auto px-4 sm:px-6 relative z-10">
				<div className="max-w-3xl mx-auto text-center mb-8 md:mb-16 animate-fade-in">
					<Badge className="bg-white text-cyan-700 border border-cyan-200 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold rounded-full mb-4 md:mb-6 shadow-sm hover:shadow-md transition-all">
						3 SIMPLE STEPS
					</Badge>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 px-4">
						Your Perfect Smile Awaits
					</h2>
					<p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
						Transform your smile with our premium dental experience in just three elegant steps
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="relative">
						<div className="absolute left-6 sm:left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-teal-400 hidden sm:block rounded-full"></div>

						<div className="space-y-10 md:space-y-16">
							{/* Step 1 */}
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 relative group">
								<div className="sm:w-16 flex-shrink-0 flex flex-col items-center">
									<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
										1
									</div>
									<div className="flex-grow w-1 bg-gradient-to-b from-cyan-400 to-teal-400 sm:hidden rounded-full"></div>
								</div>
								<div className="flex-grow pt-3">
									<Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group-hover:-translate-y-2 z-10">
										<h3 className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2 sm:mb-4">
											Initial Consultation
										</h3>
										<p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
											Start with an initial consultation at our state-of-the-art clinic. Our experts will craft your personalized smile vision.
										</p>
										<div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-cyan-100">
											<div className="flex items-start gap-2 sm:gap-3">
												<Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-0.5 flex-shrink-0 animate-pulse" />
												<p className="text-slate-700 text-xs sm:text-sm break-normal whitespace-normal">
													<span className="font-semibold text-cyan-600">FREE PREVIEW:</span> Enjoy a complimentary Digital Smile Preview tailored just for you!
												</p>
											</div>
										</div>
									</Card>
								</div>
							</div>

							{/* Step 2 */}
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 relative group">
								<div className="sm:w-16 flex-shrink-0 flex flex-col items-center">
									<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
										2
									</div>
									<div className="flex-grow w-1 bg-gradient-to-b from-cyan-400 to-teal-400 sm:hidden rounded-full"></div>
								</div>
								<div className="flex-grow pt-3">
									<Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group-hover:-translate-y-2 z-10">
										<h3 className="text-xl sm:text-2xl font-bold text-cyan-600 mb-2 sm:mb-4">
											Custom Treatment Plan
										</h3>
										<p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
											Receive a personalized treatment plan with premium options, clear pricing, and a timeline designed specifically to meet your unique needs.
										</p>
										<div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-cyan-100">
											<div className="flex items-start gap-2 sm:gap-3">
												<CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500 mt-0.5 flex-shrink-0 animate-pulse" />
												<p className="text-slate-700 text-xs sm:text-sm break-normal whitespace-normal">
													<span className="font-semibold text-cyan-600">EASY PAY:</span> Enjoy seamless and flexible payment options with top banks.
												</p>
											</div>
										</div>
									</Card>
								</div>
							</div>

							{/* Step 3 */}
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 relative group">
								<div className="sm:w-16 flex-shrink-0 flex flex-col items-center">
									<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
										3
									</div>
								</div>
								<div className="flex-grow pt-3">
									<Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-md border-none shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl group-hover:-translate-y-2 z-10">
										<h3 className="text-xl sm:text-2xl font-bold text-cyan-700 mb-2 sm:mb-4">
											Smile Transformation
										</h3>
										<p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
											Perfectly crafted veneers for a flawless, natural smile.
										</p>
										<div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-cyan-200">
											<div className="flex items-start gap-2 sm:gap-3">
												<Shield className="h-5 w-5 sm:h-7 sm:w-7 text-cyan-600 mt-0.5 flex-shrink-0 animate-pulse" />
												<p className="text-slate-700 text-xs sm:text-sm break-normal whitespace-normal">
													Superior artistry. Stunning results.
												</p>
											</div>
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-10 md:mt-16 text-center">
						<Link href="https://smileculturemumbai.in/contact-us/">
							<Button
								size="lg"
								className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white rounded-full px-6 py-2 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
							>
								Begin Your Transformation
								<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;