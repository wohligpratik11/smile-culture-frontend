import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import Image from "next/image";
import ForumDoctorFace from "../../../public/assets/images/forumDoctorFace.webp";
import DoctorBedImage from "../../../public/assets/images/doctorbed.webp";

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

// Countdown Timer Component with improved styling and responsiveness
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

	// Enhanced responsive timer display with segments
	return (
		<div className="flex items-center space-x-1">
			{formatTime(timeLeft).split(':').map((segment, index) => (
				<React.Fragment key={index}>
					<span className="bg-amber-100 text-amber-800 font-mono font-bold text-xs xs:text-sm sm:text-base py-0.5 xs:py-1 px-1 xs:px-1.5 sm:px-2 rounded">
						{segment}
					</span>
					{index < 2 && <span className="text-amber-800 font-bold">:</span>}
				</React.Fragment>
			))}
		</div>
	);
};

// Trust badges component with responsive design
const TrustBadges = () => (
	<div className="flex flex-wrap justify-center lg:justify-start gap-2 xs:gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
		{[
			{ icon: Shield, text: "100% Safe Procedure" },
			{ icon: CheckCircle, text: "Quick Results" },
			{ icon: BadgeCheck, text: "Expert Dentists" }
		].map((badge, index) => (
			<div key={index} className="flex items-center gap-1 sm:gap-1.5">
				<badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
				<span className="text-xs sm:text-sm font-medium text-slate-600">{badge.text}</span>
			</div>
		))}
	</div>
);

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
		<div className="relative bg-gradient-to-b from-sky-50 via-white to-cyan-50 overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-300 rounded-full opacity-20 blur-3xl"></div>
				<div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-300 rounded-full opacity-20 blur-3xl"></div>
			</div>

			{/* Main content container */}
			<div className="container mx-auto px-4 py-6 sm:py-8 md:py-8 lg:py-8 relative z-10">
				{/* Hero section with truly responsive layout for all screen sizes */}
				<div className="flex flex-col lg:flex-row-reverse gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
					{/* Image section with enhanced 3D effect and balanced responsive sizing */}
					<div className="w-full  max-w-lg mx-auto relative perspective lg:mb-40">
						<div
							className="relative overflow-hidden transition-all duration-500 ease-out "
							style={{
								transformStyle: 'preserve-3d',
								transform: hoverState ? 'rotateY(5deg) rotateX(3deg) scale(1.05)' : 'rotateY(0) rotateX(0) scale(1)',
							}}
							onMouseEnter={() => setHoverState(true)}
							onMouseLeave={() => setHoverState(false)}
						>
							{/* Main image with balanced size */}
							<div className="relative z-10">
								<Image
									src={ForumDoctorFace}
									alt="Premium dental veneer treatment"
									width={600}
									height={720}
									className="w-full h-auto transition-transform duration-500 object-cover"
									style={{
										filter: 'drop-shadow(0 20px 13px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.12))',
										transform: hoverState ? 'translateZ(30px)' : 'translateZ(0)',
										aspectRatio: '5/5'
									}}
									priority
								/>

								{/* Image overlay gradient */}
								<div
									className="absolute inset-0  from-cyan-900/30 to-transparent"
								></div>
							</div>

							{/* Enhanced reflection effect */}
							<div
								className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent transform"
								style={{
									transformOrigin: 'bottom',
									transform: 'rotateX(180deg) translateY(100%)',
									opacity: hoverState ? 0.4 : 0.2
								}}
							></div>

							{/* Glow effect around the image */}
							<div
								className="absolute inset-0 z-0 transition-opacity duration-500"
								style={{
									background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.3) 0%, rgba(56, 189, 248, 0) 70%)',
									opacity: hoverState ? 0.8 : 0
								}}
							></div>

							{/* Responsive testimonial badge - hidden on smallest screens */}
							<div className="hidden sm:flex items-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 animate-pulse">
								<div className="flex -space-x-1 sm:-space-x-2">
									{[1, 2, 3].map((i) => (
										<div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
											{i}
										</div>
									))}
								</div>
								<div className="text-xs font-medium pr-1">
									<p className="text-slate-700">500+ Happy Patients</p>
									<div className="flex">
										{[1, 2, 3, 4, 5].map((i) => (
											<Star key={i} className="w-3 h-3 text-amber-400" fill="#FBBF24" />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content section with improved responsive typography and spacing */}
					<div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left">
						<Badge className="bg-gradient-to-r from-teal-400 to-cyan-400 text-white hover:from-teal-500 hover:to-cyan-500 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full shadow-sm">
							LIMITED TIME OFFER
						</Badge>

						<h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
							Transform Your Smile With{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">Premium Dental Veneers</span>
						</h1>

						<p className="text-base xs:text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
							Achieve the perfect smile in just 2-3 visits with our advanced
							porcelain veneers technology.
						</p>

						{/* Enhanced card with responsive sizing */}
						<Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-3 sm:p-4 md:p-5 shadow-lg transform transition-transform hover:scale-102 hover:shadow-xl">
							<div className="flex items-start gap-2 sm:gap-3 md:gap-4">
								<Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-red-500 mt-1 flex-shrink-0" />
								<div>
									<h3 className="font-bold text-red-700 text-base xs:text-lg sm:text-xl mb-1 sm:mb-2">BREAKING NEWS:</h3>
									<p className="text-slate-700 text-sm xs:text-base">
										Transform your smile with our expert Cosmetic Dentistry services, including a
										<span className="font-bold"> personalized consultation</span> and a
										<span className="font-bold text-teal-600"> complimentary smile analysis!</span>
									</p>
								</div>
							</div>
						</Card>

						{/* Urgency elements with responsive timer */}
						<div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-amber-200 sm:border-2 shadow-md sm:shadow-lg">
							<div className="flex flex-col xs:flex-row items-center justify-between gap-2 mb-2 sm:mb-3">
								<p className="font-medium text-slate-800 text-base sm:text-lg">Special Offer Ending:</p>
								<div className="scale-75 xs:scale-90 sm:scale-100 origin-center">
									<CountdownTimer />
								</div>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
								<div
									className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out"
									style={{ width: `${percentageBooked}%` }}
								></div>
							</div>
							<div className="flex justify-between text-xs sm:text-sm mt-1 sm:mt-2">
								<p className="text-amber-700 font-medium">{percentageBooked}% Booked</p>
								<p className="text-amber-700 font-bold">Only {remainingSlots} slots left!</p>
							</div>
						</div>

						{/* Call to action buttons with responsive sizing */}
						<div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
							<Link href="https://smileculturemumbai.in/contact-us/" className="w-full xs:w-auto">
								<Button
									size="lg"
									className="w-full xs:w-auto inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-sm xs:text-base sm:text-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-full py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-6 md:px-8 shadow-md sm:shadow-lg hover:shadow-xl hover:translate-y-0.5"
								>
									Book Your Free Consultation
									<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
								</Button>
							</Link>

							<Link href="tel:+919876543210" className="w-full xs:w-auto">
								<Button
									variant="outline"
									size="lg"
									className="w-full xs:w-auto inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-sm xs:text-base sm:text-lg font-medium transition-all focus-visible:outline-none border border-cyan-600 sm:border-2 text-cyan-700 hover:bg-cyan-50 rounded-full py-3 sm:py-4 md:py-5 lg:py-6 px-4 sm:px-6 md:px-8"
								>
									<Phone className="h-4 w-4 sm:h-5 sm:w-5" />
									Call Us Now
								</Button>
							</Link>
						</div>

						{/* Trust badges with responsive styling */}
						<TrustBadges />

						{/* Urgency message */}
						<div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2 text-slate-500 animate-pulse">
							<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
							<p className="text-xs sm:text-sm font-medium">Hurry! Limited slots available this week</p>
						</div>
					</div>
				</div>

				{/* Additional benefits section with responsive grid */}
				<div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
					{[
						{
							icon: CheckCircle,
							title: "Natural-Looking Results",
							desc: "Custom-designed to match your natural teeth color and shape"
						},
						{
							icon: Calendar,
							title: "Quick Procedure",
							desc: "Complete your treatment in just 2-3 comfortable visits"
						},
						{
							icon: ThumbsUp,
							title: "Long-Lasting Solution",
							desc: "Enjoy your beautiful smile for 10-15 years with proper care"
						}
					].map((benefit, index) => (
						<Card key={index} className="p-4 sm:p-6 border border-gray-200 hover:border-cyan-200 transition-all hover:shadow-lg">
							<div className="flex flex-col items-center text-center">
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-3 sm:mb-4">
									<benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600" />
								</div>
								<h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1 sm:mb-2">{benefit.title}</h3>
								<p className="text-sm sm:text-base text-slate-600">{benefit.desc}</p>
							</div>
						</Card>
					))}
				</div>
		
			</div>
		</div>
	);
};

export default HeroSection;