import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import DoctorBedImage from "../../../public/assets/images/doctorbed.webp"

// Countdown Timer Component
const CountdownTimer = () => {
	const initialTime = 48 * 60 * 60; // 48 hours in seconds
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	return (
		<span className="font-mono text-amber-700 font-bold">
			{formatTime(timeLeft)}
		</span>
	);
};

const HeroSection = () => {
	const totalSlots = 100; // Total slots available
	const [remainingSlots, setRemainingSlots] = useState(78); // Initial remaining slots
	const [percentageBooked, setPercentageBooked] = useState(22); // Initial percentage
	const [hoverState, setHoverState] = useState(false); // State for 3D hover effect
	const [lastResetTime, setLastResetTime] = useState(new Date().getTime()); // Track when we last reset

	useEffect(() => {
		const updateSlots = () => {
			const now = new Date().getTime();
			const minutesSinceReset = Math.floor((now - lastResetTime) / (1000 * 60));

			// Update 1 slot every 30 minutes
			const slotsToUpdate = Math.floor(minutesSinceReset / 30);

			if (slotsToUpdate > 0) {
				// Calculate new percentage booked
				let newPercentageBooked = percentageBooked + slotsToUpdate;
				let newRemainingSlots = remainingSlots - slotsToUpdate;

				// Check if we need to reset (when we reach or exceed 99%)
				if (newPercentageBooked >= 99) {
					// Reset the booking percentage back to 0
					newPercentageBooked = 0;
					newRemainingSlots = totalSlots;
					// Update the last reset time
					setLastResetTime(now);
				}

				// Update state
				setPercentageBooked(newPercentageBooked);
				setRemainingSlots(totalSlots - newPercentageBooked);
			}
		};

		// Initial call
		updateSlots();

		// Update every minute to check if we need to update slots
		const interval = setInterval(updateSlots, 60 * 1000);

		return () => clearInterval(interval);
	}, [percentageBooked, remainingSlots, lastResetTime]);

	return (
		<div className="container mx-auto px-4 py-2 md:py-2">
			<div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
				<div className="w-full md:w-1/2 space-y-6">
					<Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1 text-sm font-medium rounded-full">
						EXCLUSIVE OFFER
					</Badge>

					<h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
						Transform Your Smile With{" "}
						<span className="text-cyan-600">Premium Dental Veneers</span>
					</h1>

					<p className="text-slate-600 text-lg">
						Achieve the perfect smile in just 2-3 visits with our advanced
						porcelain veneers technology.
					</p>

					<Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-4 shadow-lg">
						<div className="flex items-start gap-3">
							<Sparkles className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
							<div>
								<h3 className="font-bold text-red-700 text-lg">BREAKING NEWS:</h3>
								<p className="text-slate-700">
									Transform your smile with our expert Cosmetic Dentistry services, including a personalized consultation and a complimentary smile analysis!
								</p>
							</div>
						</div>
					</Card>

					{/* Urgency elements with Timer */}
					<div className="bg-white p-4 rounded-lg border border-amber-200 shadow-md">
						<div className="flex items-center justify-between mb-2">
							<p className="font-medium text-slate-800">Offer Ending Soon:</p>
							<CountdownTimer />
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-amber-500 h-2.5 rounded-full"
								style={{ width: `${percentageBooked}%` }}
							></div>
						</div>
						<div className="flex justify-between text-sm mt-1">
							<p className="text-amber-700">{percentageBooked}% Booked</p>
							<p className="text-amber-700">Only {remainingSlots} slots left</p>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="https://smileculturemumbai.in/contact-us/">
							<Button
								size="lg"
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-10 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-full px-8 w-full sm:w-auto"
							>
								Book Your Consultation Now
							</Button>
						</Link>
						{/* <Button
							variant="outline"
							size="lg"
							className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 rounded-full px-8"
						>
							Learn More
						</Button> */}
					</div>

					<div className="flex items-center gap-2 text-slate-500">
						<Clock className="h-4 w-4" />
						<p className="text-sm">Hurry! Limited slots available</p>
					</div>
				</div>

				<div className="w-full md:w-1/2 relative perspective">
					{/* Enhanced 3D effect container */}
					<div
						className="relative rounded-xl overflow-hidden transform transition-all duration-500 ease-out"
						style={{
							transformStyle: 'preserve-3d',
							transform: hoverState ? 'rotateY(5deg) rotateX(3deg) scale(1.05)' : 'rotateY(0) rotateX(0) scale(1)',
						}}
						onMouseEnter={() => setHoverState(true)}
						onMouseLeave={() => setHoverState(false)}
					>
						{/* Gradient overlay for depth */}
						<div className="absolute inset-0 "></div>

						{/* Highlight effect */}
						<div
							className="absolute inset-0 bg-gradient-to-br  via-transparent to-transparent opacity-0 transition-opacity duration-500"
							style={{ opacity: hoverState ? 0.6 : 0 }}
						></div>

						{/* Main image with enhanced perspective */}
						<div className="relative z-10">
							<Image
								src={DoctorBedImage}
								alt="Premium dental veneer treatment"
								width={500}
								height={600}
								className="w-full h-auto transition-transform duration-500"
								style={{
									filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))',
									transform: hoverState ? 'translateZ(20px)' : 'translateZ(0)'
								}}
								priority
							/>
						</div>

						{/* Subtle reflection effect */}
						<div
							className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent transform"
							style={{
								transformOrigin: 'bottom',
								transform: 'rotateX(180deg) translateY(100%)',
								opacity: hoverState ? 0.3 : 0.1
							}}
						></div>
					</div>

					{/* Floating elements for added depth perception */}
					<div
						className="absolute -bottom-4 -right-4 w-16 h-16rounded-full opacity-30 blur-xl transition-all duration-700"
						style={{
							transform: hoverState ? 'translateZ(30px) scale(1.2)' : 'translateZ(0) scale(1)'
						}}
					></div>
					<div
						className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-xl transition-all duration-700"
						style={{
							transform: hoverState ? 'translateZ(20px) scale(1.1)' : 'translateZ(0) scale(1)'
						}}
					></div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;