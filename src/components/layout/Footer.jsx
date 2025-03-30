import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
const Footer = () => {
	const router = useRouter();

	return (
		<div className="bg-white py-12 border-t border-slate-200">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					{/* <div className="grid md:grid-cols-3 gap-8">
						<div className="space-y-4">
							<h3 className="text-lg font-bold text-slate-900">Contact Us</h3>
							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<div className="bg-cyan-100 p-2 rounded-full mt-0.5">
										<Phone className="h-4 w-4 text-cyan-600" />
									</div>
									<div>
										<p className="font-medium text-slate-900">Call Us</p>
										<p className="text-slate-600">+91 8369892101</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="bg-cyan-100 p-2 rounded-full mt-0.5">
										<svg
											className="h-4 w-4 text-cyan-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-medium text-slate-900">Email Us</p>
										<p className="text-slate-600">smileculturedc@gmail.com</p>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-bold text-slate-900">
								Clinic Hours
							</h3>
							<div className="space-y-2 text-slate-600">
								<p>Monday - Friday: 9:00 AM - 8:00 PM</p>
								<p>Saturday: 9:00 AM - 6:00 PM</p>
								<p>Sunday: 10:00 AM - 4:00 PM</p>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-bold text-slate-900">
								Quick Links
							</h3>
							<div className="space-y-2">
								<p>
									<Link
										href="#"
										className="text-cyan-600 hover:text-cyan-700"
									>
										About Us
									</Link>
								</p>
								<p>
									<Link
										href="#"
										className="text-cyan-600 hover:text-cyan-700"
									>
										Services
									</Link>
								</p>
								<p>
									<Link
										href="#"
										className="text-cyan-600 hover:text-cyan-700"
									>
										Before & After Gallery
									</Link>
								</p>
								<p>
									<Link
										href="#"
										className="text-cyan-600 hover:text-cyan-700"
									>
										FAQs
									</Link>
								</p>
							</div>
						</div>
					</div> */}

					<div className="text-center">
						<h3 className="text-2xl font-bold text-slate-900 mb-6">
							Ready for Your Smile Transformation?
						</h3>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="https://smileculturemumbai.in/contact-us/">
								<Button
									size="lg"
									className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-full px-8 w-full sm:w-auto"
								>
									Book Your Consultation Now
								</Button>
							</Link>
							<Button
								variant="outline"
								size="lg"
								className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 rounded-full px-8"
							>
								Call Us: +91 8369892101
							</Button>
						</div>
						<p className="mt-6 text-slate-500">
							© 2025 Smile Culture Dental Clinic, Malad. All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;