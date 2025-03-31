import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "../components/ui/button";
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
		<span className="font-mono text-white font-bold">
			{formatTime(timeLeft)}
		</span>
	);
};

const BookingSection = () => {
	const totalSlots = 100; // Total slots available
	const [remainingSlots, setRemainingSlots] = useState(78); // Initial remaining slots
	const [percentageBooked, setPercentageBooked] = useState(22); // Initial percentage
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
		<div className="bg-gradient-to-br from-cyan-900 to-teal-800 text-white py-8 md:py-8 lg:py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
					<Badge className="bg-white/20 text-white hover:bg-white/30 px-2 py-1 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
						LIMITED TIME OFFER
					</Badge>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
						Book Your Consultation Now
					</h2>
					<p className="text-teal-200 text-base sm:text-lg md:text-lg max-w-xl mx-auto">
						Secure your spot now for our exclusive consultation with a complimentary digital smile preview
					</p>

					{/* Urgency elements with Timer */}
					<div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 mt-6 sm:mt-8 mb-8 sm:mb-10">
						<div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3">
							<p className="font-medium text-white text-sm sm:text-base">Limited Availability:</p>
							<div className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium animate-pulse mt-2 sm:mt-0">
								Selling Fast
							</div>
						</div>

						<div className="w-full bg-white/20 rounded-full h-2 mb-2">
							<div
								className="bg-gradient-to-r from-amber-400 to-red-500 h-2 rounded-full"
								style={{ width: `${percentageBooked}%` }}
							></div>
						</div>
						<div className="flex justify-between text-xs sm:text-sm">
							<p className="text-white/80">{percentageBooked}% Booked</p>
							<p className="text-white/80">Only {remainingSlots} slots left</p>
						</div>
					</div>

					<div className="mt-6 sm:mt-8 md:mt-10">
						<Link href="https://smileculturemumbai.in/contact-us/">
							<Button
								size="lg"
								className="bg-white hover:bg-gray-100 text-cyan-800 rounded-full px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-medium shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
							>
								Book Your Consultation Now
							</Button>
						</Link>

						{/* Simple deadline text */}
						<div className="relative">
							<p className="mt-3 sm:mt-4 text-xs sm:text-sm text-teal-200">
								<Clock className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
								Hurry! Limited slots available
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingSection;