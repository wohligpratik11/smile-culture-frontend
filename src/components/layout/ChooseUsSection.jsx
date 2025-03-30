import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const DoctorSection = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const feedbackPages = [
		[
			{
				quote: "Dr. Forum Gada is an excellent dentist with a caring approach. Highly professional, skilled, and attentive to patient needs. Highly recommended!",
				name: "Jainam Nisar",
				rating: 5,
			},
			{
				quote: "Dr Forum Gada is a very professional & knowledgeable Dental Surgeon. I am routinely visiting her clinic in Malad West for check ups, teeth cleaning, consultation regarding teeth hygiene, etc. & have been satisfied with their services. Like",
				name: "Chirag Gokalgandhi",
				rating: 5,
			},
			{
				quote: "I had my teeth cleaning and filling for the first time at smile culture dental clinic.Treatment was totally painless.The quality of treatment and service is good.It has good experience.",
				name: "Raghottam Kulkarni",
				rating: 5,
			}
		],
		[
			{
				quote: "Service here is really good. Dr. Forum and her staff are friendly and professional and the clinical arrangement is excellent.",
				name: "Ms Shruti Sawant",
				rating: 4.5,
			},

			{
				quote: "I had recently visited the clinic at Malad West for my dental problems. Their services are very good and up to the mark. The staff is also very friendly and nice. It is a trustworthy clinic to get your treatment done.",
				name: "Krupa Savla",
				rating: 5,
			},
			{
				quote: "Amazing services offered. the dental treatment was done efficiently. Will definitely recommend",
				name: "Hazel Dsilva",
				rating: 5,
			},
		]
	];

	// For mobile view, we'll flatten the array to show one item at a time
	const flattenedFeedback = feedbackPages.flat();
	const [isMobile, setIsMobile] = useState(false);

	// Check for screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener('resize', checkScreenSize);

		// Clean up
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	const changePage = (newPage) => {
		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentPage(newPage);
			setTimeout(() => setIsTransitioning(false), 50);
		}, 300);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isMobile) {
				const nextPage = (currentPage + 1) % flattenedFeedback.length;
				changePage(nextPage);
			} else {
				const nextPage = (currentPage + 1) % feedbackPages.length;
				changePage(nextPage);
			}
		}, 7000);
		return () => clearInterval(interval);
	}, [currentPage, isMobile]);

	const nextPage = () => {
		if (isMobile) {
			changePage((currentPage + 1) % flattenedFeedback.length);
		} else {
			changePage((currentPage + 1) % feedbackPages.length);
		}
	};

	const prevPage = () => {
		if (isMobile) {
			changePage((currentPage - 1 + flattenedFeedback.length) % flattenedFeedback.length);
		} else {
			changePage((currentPage - 1 + feedbackPages.length) % feedbackPages.length);
		}
	};

	const goToPage = (index) => changePage(index);

	const renderStars = (rating) => {
		return Array(5).fill(0).map((_, i) => {
			if (i < Math.floor(rating)) {
				return <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />;
			} else if (i < rating) {
				return (
					<div key={i} className="relative h-4 w-4 md:h-5 md:w-5">
						<Star className="h-4 w-4 md:h-5 md:w-5 text-gray-200" />
						<div className="absolute top-0 left-0 overflow-hidden w-1/2">
							<Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-yellow-400" />
						</div>
					</div>
				);
			} else {
				return <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-gray-200" />;
			}
		});
	};

	return (
		<div className="bg-gradient-to-b from-white to-white py-8 md:py-12">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
					<Badge className="bg-cyan-500 text-white px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold rounded-full mb-3 md:mb-4 animate-bounce">
						PATIENT LOVE
					</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-shadeBlue to-blue-600 mb-3 md:mb-4">
						What Our Patients Say
					</h2>
					<p className="text-slate-700 text-base md:text-lg font-medium">
						Real smiles, real stories, real satisfaction
					</p>
				</div>

				<div className="relative max-w-full mx-auto px-4 md:px-8">
					{isMobile ? (
						// Mobile view - Show one testimonial at a time
						<div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
							<Card
								className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden transform hover:shadow-xl transition-all duration-300 relative min-h-[250px] md:min-h-[300px] mx-auto max-w-sm"
							>
								<div className="p-4 md:p-6 space-y-3 md:space-y-4 relative pb-8">
									<div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 bg-shadeBlue rounded-br-full opacity-30" />
									<Quote className="h-6 w-6 md:h-8 md:w-8 text-cyan-400 mx-auto opacity-60" />
									<p className="text-slate-700 text-center italic font-medium text-sm md:text-base min-h-[60px] md:min-h-[80px]">"{flattenedFeedback[currentPage].quote}"</p>
									<div className="space-y-1 md:space-y-2">
										<p className="text-center font-semibold text-slate-900 text-base md:text-lg">{flattenedFeedback[currentPage].name}</p>
										<div className="flex justify-center gap-1">{renderStars(flattenedFeedback[currentPage].rating)}</div>
									</div>
								</div>
								<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400" />
							</Card>
						</div>
					) : (
						// Desktop view - Show three testimonials in a grid
						<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
							{feedbackPages[currentPage]?.map((feedback, index) => (
								<Card
									key={`${currentPage}-${index}`}
									className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 relative min-h-[300px]"
								>
									<div className="p-6 space-y-4 relative pb-8">
										<div className="absolute top-0 left-0 w-16 h-16 bg-shadeBlue rounded-br-full opacity-30" />
										<Quote className="h-8 w-8 text-cyan-400 mx-auto opacity-60" />
										<p className="text-slate-700 text-center italic font-medium min-h-[80px]">"{feedback.quote}"</p>
										<div className="space-y-2">
											<p className="text-center font-semibold text-slate-900 text-lg">{feedback.name}</p>
											<div className="flex justify-center gap-1">{renderStars(feedback.rating)}</div>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400" />
								</Card>
							))}
						</div>
					)}

					{/* Navigation Buttons */}
					<button
						onClick={prevPage}
						className="absolute left-0 sm:left-[-12px] md:left-[-24px] top-1/2 -translate-y-1/2 bg-cyan-500 h-8 w-8 md:h-12 md:w-12 rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-600 hover:scale-110 transition-all duration-200 z-20"
						aria-label="Previous page"
					>
						<ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
					</button>

					<button
						onClick={nextPage}
						className="absolute right-0 sm:right-[-12px] md:right-[-24px] top-1/2 -translate-y-1/2 bg-cyan-500 h-8 w-8 md:h-12 md:w-12 rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-600 hover:scale-110 transition-all duration-200 z-20"
						aria-label="Next page"
					>
						<ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
					</button>

					{/* Indicator Dots */}
					<div className="flex justify-center mt-6 md:mt-8">
						{isMobile ? (
							// Mobile indicators for individual testimonials
							flattenedFeedback?.map((_, index) => (
								<button
									key={index}
									onClick={() => goToPage(index)}
									className={`h-2 w-2 md:h-3 md:w-3 mx-1 md:mx-2 rounded-full transition-all duration-300 ${currentPage === index
										? 'bg-cyan-500 scale-125'
										: 'bg-gray-300 hover:bg-gray-400'
										}`}
									aria-label={`Go to testimonial ${index + 1}`}
								/>
							))
						) : (
							// Desktop indicators for pages
							feedbackPages.map((_, index) => (
								<button
									key={index}
									onClick={() => goToPage(index)}
									className={`h-2 w-2 md:h-3 md:w-3 mx-1 md:mx-2 rounded-full transition-all duration-300 ${currentPage === index
										? 'bg-cyan-500 scale-125'
										: 'bg-gray-300 hover:bg-gray-400'
										}`}
									aria-label={`Go to page ${index + 1}`}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorSection;