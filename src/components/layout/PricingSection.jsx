"use client"

import {
	ArrowRight,
	Star,
	Gift,
	Award,
	SmileIcon,
	Sparkles,
	Shield,
	Clock,
	Heart,
	ChevronDown,
	ChevronUp,
	MapPin,
	Calendar,
	Phone,
	Zap,
	Gem,
	Crown,
	Syringe,
	Scissors,
	Stethoscope,
	Pill,
	Smile,
	Droplet,
	Bone,
	Menu,
	X
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const DentalLandingPage = () => {
	const [showAll, setShowAll] = useState(false)
	const [newlyAdded, setNewlyAdded] = useState([])
	const [isButtonAnimating, setIsButtonAnimating] = useState(false)
	const [activeIcon, setActiveIcon] = useState(0)
	const [expandedCard, setExpandedCard] = useState(null)
	const [hoveredAward, setHoveredAward] = useState(null)
	const [clickedAward, setClickedAward] = useState(null) // New state to track clicked awards
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	// Phone number for contact
	const phoneNumber = "+918369892101"

	// Function to handle phone call
	const handlePhoneCall = () => {
		window.location.href = `tel:${phoneNumber}`
	}

	// Title icons with corresponding text
	const titleIcons = [
		{ icon: <SmileIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />, text: "Premium Dental Care" },
		{ icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />, text: "Exceptional Quality" },
		{ icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />, text: "Safe Procedures" },
		{ icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />, text: "Quick Recovery" },
		{ icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />, text: "Patient-Centered Care" },
	]

	// Rotate through title icons
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIcon((prev) => (prev + 1) % titleIcons.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	// Award icons for each dental service
	const awardIcons = {
		"Root Canal Treatment": { icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-violet-600" },
		"Teeth Fillings": { icon: <Droplet className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-teal-500" },
		Dentures: { icon: <Smile className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-slate-500" },
		"Dental Implants": { icon: <Bone className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-indigo-500" },
		"Teeth Braces": { icon: <Gem className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-cyan-500" },
		"Clear Aligners": { icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-sky-500" },
		"Teeth Cleaning": { icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-green-500" },
		"Smile Designing": { icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-rose-500" },
		"Tooth Crown": { icon: <Crown className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-emerald-500" },
		"Dental Bridges": { icon: <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-fuchsia-900" },
		"Tooth Extraction": { icon: <Scissors className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-red-500" },
		"Teeth Scaling": { icon: <Syringe className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-green-600" },
		Gingivitis: { icon: <Pill className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-red-400" },
		"Gum Surgeries": { icon: <Scissors className="h-4 w-4 sm:h-5 sm:w-5" />, color: "bg-teal-600" },
	}

	const dentalServices = [
		{
			title: "Root Canal Treatment",
			description:
				"Root canal treatment is a dental procedure that saves and restores a severely infected or damaged tooth...",
			color: "bg-gradient-to-br from-violet-700 to-violet-900",
			benefit: "Painless Procedure",
			fullDescription:
				"Root canal treatment is a dental procedure that saves and restores a severely infected or damaged tooth by removing the infected pulp, cleaning the inside of the tooth, and sealing it to prevent further infection. This procedure helps preserve your natural tooth and prevents the need for extraction.",
		},
		{
			title: "Teeth Fillings",
			description:
				"Teeth fillings are dental restorations used to treat cavities or repair damaged teeth by filling the empty space...",
			color: "bg-gradient-to-br from-teal-400 to-teal-600",
			benefit: "Same-Day Service",
			fullDescription:
				"Teeth fillings are dental restorations used to treat cavities or repair damaged teeth by filling the empty space with a durable material. This prevents further decay and restores the tooth's function and appearance. Our clinic offers same-day service for most filling procedures.",
		},
		{
			title: "Dentures",
			description:
				"Dentures are removable dental appliances designed to replace missing teeth and surrounding tissues, restoring the...",
			color: "bg-gradient-to-br from-slate-400 to-slate-600",
			benefit: "Custom Fitting",
			fullDescription:
				"Dentures are removable dental appliances designed to replace missing teeth and surrounding tissues, restoring the appearance of your smile and improving your ability to eat and speak. Our custom fitting process ensures maximum comfort and natural appearance.",
		},
		{
			title: "Dental Implants",
			description:
				"Dental implants are permanent artificial tooth roots that are surgically placed into the jawbone, providing...",
			color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
			benefit: "Lifetime Guarantee",
			fullDescription:
				"Look no further! Our experienced dental team specializes in providing high-quality dental implant treatments that can restore your smile and improve your oral health. Dental implants are a long-lasting and natural-looking solution for replacing missing teeth. Book an appointment at Smile Culture Dental Clinic in Malad, Mumbai to explore the possibilities of dental implants and regain your confident smile.",
			detailedView: true,
			image: "/placeholder.svg?height=400&width=800",
		},
		{
			title: "Teeth Braces",
			description:
				"Teeth braces are orthodontic devices consisting of brackets, wires, and bands that apply gentle pressure to...",
			color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
			benefit: "Flexible Options",
			fullDescription:
				"Teeth braces are orthodontic devices consisting of brackets, wires, and bands that apply gentle pressure to gradually shift teeth into proper alignment. We offer flexible options including traditional metal braces, ceramic braces, and other alternatives to suit your preferences.",
		},
		{
			title: "Clear Aligners",
			description:
				"Clear aligners are transparent, removable orthodontic devices that gradually shift and align teeth, providing a discreet...",
			color: "bg-gradient-to-br from-sky-400 to-sky-600",
			benefit: "Invisible Solution",
			fullDescription:
				"Clear aligners are transparent, removable orthodontic devices that gradually shift and align teeth, providing a discreet alternative to traditional braces. These custom-made aligners are virtually invisible, comfortable to wear, and can be removed for eating and cleaning.",
		},
		{
			title: "Teeth Cleaning",
			description:
				"Teeth cleaning is a professional dental procedure that involves the removal of plaque, tartar, and stains from the teeth...",
			color: "bg-gradient-to-br from-green-400 to-green-600",
			benefit: "Complimentary Kit",
			fullDescription:
				"Teeth cleaning is a professional dental procedure that involves the removal of plaque, tartar, and stains from the teeth and gums. Regular cleanings help prevent gum disease, cavities, and other dental issues. Each cleaning comes with a complimentary dental care kit.",
		},
		{
			title: "Smile Designing",
			description:
				"Smile designing is a comprehensive dental approach that combines various cosmetic treatments to enhance...",
			color: "bg-gradient-to-br from-rose-400 to-rose-600",
			benefit: "Free Consultation",
			fullDescription:
				"Smile designing is a comprehensive dental approach that combines various cosmetic treatments to enhance the overall appearance of your smile. This may include veneers, whitening, bonding, and other procedures tailored to your specific needs. We offer free consultations to discuss your smile goals.",
		},
		{
			title: "Tooth Crown",
			description:
				"A tooth crown, also known as a dental crown, is a custom-made protective cap that covers a damaged or weakened...",
			color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
			benefit: "Natural Look",
			fullDescription:
				"A tooth crown, also known as a dental crown, is a custom-made protective cap that covers a damaged or weakened tooth to restore its shape, size, strength, and appearance. Our crowns are designed to look completely natural and blend seamlessly with your existing teeth.",
		},
		{
			title: "Dental Bridges",
			description:
				"Dental bridges are fixed dental restorations that bridge the gap created by one or more missing teeth, using adjacent teeth...",
			color: "bg-gradient-to-br from-fuchsia-800 to-fuchsia-950",
			benefit: "Quick Restoration",
			fullDescription:
				"Dental bridges are fixed dental restorations that bridge the gap created by one or more missing teeth, using adjacent teeth or implants as anchors. Bridges restore your smile, ability to properly chew and speak, and help maintain facial structure.",
		},
		{
			title: "Tooth Extraction",
			description:
				"Tooth extraction is a dental procedure in which a tooth is removed from its socket in the jawbone, typically due to...",
			color: "bg-gradient-to-br from-red-400 to-red-600",
			benefit: "Gentle Approach",
			fullDescription:
				"Tooth extraction is a dental procedure in which a tooth is removed from its socket in the jawbone, typically due to severe decay, infection, crowding, or damage. Our gentle approach minimizes discomfort and ensures a smooth recovery process.",
		},
		{
			title: "Teeth Scaling",
			description:
				"Teeth scaling, also known as dental scaling, is a professional dental procedure that involves the thorough removal...",
			color: "bg-gradient-to-br from-green-500 to-green-700",
			benefit: "Deep Cleaning",
			fullDescription:
				"Teeth scaling, also known as dental scaling, is a professional dental procedure that involves the thorough removal of plaque and tartar from the tooth surfaces, including below the gumline. This deep cleaning helps prevent gum disease and maintains optimal oral health.",
		},
		{
			title: "Gingivitis",
			description:
				"Gingivitis is a common gum disease characterized by inflammation and irritation of the gums, often caused...",
			color: "bg-gradient-to-br from-red-300 to-red-500",
			benefit: "Early Treatment",
			fullDescription:
				"Gingivitis is a common gum disease characterized by inflammation and irritation of the gums, often caused by plaque buildup. Early treatment can prevent progression to more serious periodontal disease. Our specialized treatments address the root causes and restore gum health.",
		},
		{
			title: "Gum Surgeries",
			description:
				"Gum surgeries are dental procedures aimed at treating various gum-related issues, such as gum disease or gum...",
			color: "bg-gradient-to-br from-teal-500 to-teal-700",
			benefit: "Advanced Care",
			fullDescription:
				"Gum surgeries are dental procedures aimed at treating various gum-related issues, such as gum disease or gum recession. These advanced care procedures help restore gum health, prevent tooth loss, and improve the overall appearance of your smile.",
		},
	]

	// Function to handle the "View All Treatments" button click
	const handleViewAllClick = () => {
		setIsButtonAnimating(true)

		// Animate button first, then show new treatments
		setTimeout(() => {
			// Set the indices of newly added cards
			setNewlyAdded(Array.from({ length: dentalServices.length - 6 }, (_, i) => i + 6))
			setShowAll(true)

			// Reset button animation after completion
			setTimeout(() => {
				setIsButtonAnimating(false)
			}, 500)
		}, 500)
	}

	// Clear newly added state after animation completes
	useEffect(() => {
		if (newlyAdded.length > 0) {
			const timer = setTimeout(() => {
				setNewlyAdded([])
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [newlyAdded])

	// Toggle expanded card
	const toggleCardExpansion = (index) => {
		if (expandedCard === index) {
			setExpandedCard(null)
		} else {
			setExpandedCard(index)
		}
	}

	// Display only the first 6 items initially, or all items if showAll is true
	const displayedServices = showAll ? dentalServices : dentalServices.slice(0, 6)

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	}

	// Handle award icon click to toggle animation
	const handleAwardClick = (index) => {
		if (clickedAward === index) {
			setClickedAward(null); // Re-enable animation if clicked again
		} else {
			setClickedAward(index); // Disable animation
		}
	}

	return (
		<div className="w-full bg-gradient-to-b from-slate-50 to-white py-6 sm:py-8 md:py-12">
			{/* Mobile Navigation */}

			{/* Header Section */}
			<div className="text-center mb-8 sm:mb-12 md:mb-16 mt-16 md:mt-0 px-4">
				<div className="inline-block mb-3 px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full text-xs sm:text-sm font-medium shadow-sm">
					<span className="flex items-center">
						<Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-amber-600" fill="currentColor" />
						Special Offers On All Treatments
					</span>
				</div>

				{/* Animated Title with Icons */}
				<div className="relative h-16 sm:h-20 mb-4 sm:mb-5 overflow-hidden">
					{titleIcons.map((item, index) => (
						<motion.div
							key={index}
							className="absolute inset-0 flex flex-col items-center justify-center px-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: activeIcon === index ? 1 : 0,
								y: activeIcon === index ? 0 : 20,
							}}
							transition={{ duration: 0.5 }}
						>
							<div className="flex items-center gap-2 sm:gap-3 mb-2">
								<div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-1.5 sm:p-2 rounded-lg text-white">{item.icon}</div>
								<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">{item.text}</h2>
							</div>
							<div className="flex gap-1 sm:gap-1.5 mt-1">
								{titleIcons.map((_, i) => (
									<div
										key={i}
										className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${i === activeIcon ? "w-4 sm:w-6 bg-teal-500" : "w-1 sm:w-1.5 bg-slate-200"
											}`}
									/>
								))}
							</div>
						</motion.div>
					))}
				</div>

				<p className="text-slate-600 max-w-3xl mx-auto px-4 text-sm sm:text-base md:text-lg">
					Experience our signature treatments with exclusive benefits and complimentary consultations. Every service
					includes premium care at exceptional value.
				</p>
			</div>

			{/* Services Grid */}
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayedServices.map((service, index) => (
						<motion.div
							key={index}
							initial={newlyAdded.includes(index) ? { opacity: 0, y: 30 } : { opacity: 1 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: newlyAdded.includes(index) ? (index - 6) * 0.1 : 0,
							}}
							whileHover={{ y: -5 }}
							className={`${service.color} rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group
                border-2 border-white/20 hover:border-white/30
              `}
						>
							{/* Decorative elements */}
							<div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/10 rounded-full -mr-10 sm:-mr-12 md:-mr-16 -mt-10 sm:-mt-12 md:-mt-16"></div>
							<div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 -left-4 sm:-left-5 md:-left-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/10 rounded-full"></div>

							<div className="p-8">
								{/* Award Icon Title */}
								<div className="flex items-center mb-6 relative z-10">
									<div
										className="relative cursor-pointer"
										onMouseEnter={() => clickedAward !== index && setHoveredAward(index)}
										onMouseLeave={() => clickedAward !== index && setHoveredAward(null)}
										onClick={() => handleAwardClick(index)}
									>
										<motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
											<div className="relative">
												{/* Award Badge */}
												<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner mr-2">
													<div
														className={`w-14 h-14 ${awardIcons[service.title]?.color || "bg-white/30"} rounded-full flex items-center justify-center border-2 border-white/80 shadow-lg`}
													>
														{awardIcons[service.title]?.icon || <Award size={20} className="text-white" />}
													</div>
												</div>

												{/* Animated Rays */}
												<div className="absolute inset-0 -z-10">
													{[...Array(8)].map((_, i) => (
														<motion.div
															key={i}
															className="absolute w-1 h-4 bg-white/40 rounded-full left-1/2 top-1/2 origin-bottom"
															initial={{ rotate: i * 45, scale: 0.6, opacity: 0.3 }}
															animate={{
																scale: [0.6, 0.8, 0.6],
																opacity: [0.3, 0.6, 0.3],
															}}
															transition={{
																duration: 2,
																repeat: Number.POSITIVE_INFINITY,
																delay: i * 0.2,
															}}
															style={{
																transformOrigin: "center bottom",
																marginLeft: "-2px",
																marginTop: "-16px",
															}}
														/>
													))}
												</div>
											</div>

											{/* Title text that appears on hover but not when clicked */}
											<AnimatePresence>
												{hoveredAward === index && clickedAward !== index && (
													<motion.div
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														exit={{ opacity: 0, x: -10 }}
														transition={{ duration: 0.2 }}
														className="ml-3"
													>
														<h3 className="text-2xl font-bold">{service.title}</h3>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									</div>

									{/* Always visible title (except when hovering and not clicked) */}
									<h3
										className={`text-2xl font-bold transition-opacity duration-300 ${hoveredAward === index && clickedAward !== index ? "opacity-0" : "opacity-100"
											}`}
									>
										{service.title}
									</h3>

									{service.location && (
										<div className="ml-auto flex items-center text-xs bg-white/20 px-2 py-1 rounded-full">
											<MapPin size={10} className="mr-1" />
											{service.location}
										</div>
									)}
								</div>

								<p className="text-white/90 mb-6 relative z-10 min-h-[80px]">
									{expandedCard === index ? service.fullDescription : service.description}
								</p>

								{/* Special offer badge */}
								<div className="bg-white/20 rounded-lg p-3 mb-4 relative z-10 backdrop-blur-sm">
									<p className="text-white text-sm font-medium flex items-center">
										<Gift size={14} className="mr-2" />
										<span>
											Special Offer: <span className="font-bold">{service.benefit}</span>
										</span>
									</p>
								</div>

								{/* Read More / Read Less Button */}
								<button
									onClick={() => toggleCardExpansion(index)}
									className="text-white/90 text-sm flex items-center hover:text-white transition-colors mb-4 relative z-10"
								>
									{expandedCard === index ? (
										<>
											Read Less <ChevronUp size={14} className="ml-1" />
										</>
									) : (
										<>
											Read More <ChevronDown size={14} className="ml-1" />
										</>
									)}
								</button>

								<div className="mt-auto relative z-10">
									<Link
										href="https://smileculturemumbai.in/contact-us/"
										className="text-white font-medium flex items-center group-hover:underline transition-all"
									>
										Book Appointment{" "}
										<ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
									</Link>
								</div>
							</div>

							{/* Shine effect on hover */}
							<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
						</motion.div>
					))}
				</div>

				{/* View All Services Button - Only show if not all services are displayed */}
				{!showAll && (
					<div className="mt-8 sm:mt-10 md:mt-12 text-center">
						<div className="inline-block mb-3 sm:mb-4 px-3 py-1 sm:px-4 sm:py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm shadow-sm">
							<Star className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-1.5 text-amber-600" fill="currentColor" />
							Unlock more exclusive treatments
						</div>
						<div>
							<motion.button
								onClick={handleViewAllClick}
								disabled={isButtonAnimating}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								className={`bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-blue-600 hover:to-teal-600 
                  text-white font-medium py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-full text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform relative
                  ${isButtonAnimating ? "opacity-50" : ""}`}
							>
								{isButtonAnimating ? "Please Wait..." : "View All Special Offers"}
								{!isButtonAnimating && (
									<motion.span
										initial={{ scale: 0.8 }}
										animate={{ scale: [0.8, 1.2, 1] }}
										transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
										className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold"
									>
										+{dentalServices.length - 6}
									</motion.span>
								)}
							</motion.button>
						</div>
					</div>
				)}
			</div>

			{/* Floating contact button for mobile - Now with click handler to make a phone call */}
			<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden">
				<motion.button
					onClick={handlePhoneCall}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
					aria-label="Call +91 83698 92101"
				>
					<Phone size={24} />
				</motion.button>
			</div>


			{/* Add CSS animations */}
			<style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
		</div>
	)
}

export default DentalLandingPage