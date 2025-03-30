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
import ForumDoctor from "../../../public/assets/images/forumdoctor.webp"

const DoctorSection = () => {
	const router = useRouter();

	return (
		<div className="bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 px-3 py-1 text-sm font-medium rounded-full mb-4">
						EXPERT CARE
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
						Meet Your Doctor
					</h2>
					<p className="text-slate-600 text-lg">
						Experienced professionals dedicated to creating your perfect smile
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto">
					<div className="w-full md:w-2/5">
						<div className="relative">
							{/* 3D effect with shadow and slight perspective transform */}
							<div className="absolute -inset-2 bg-gradient-to-r  to-teal-100 rounded-lg blur-lg"></div>
							<div className="relative overflow-hidden  shadow-xl transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
								<Image
									src={ForumDoctor}
									alt="Dr. Forum Gada"
									width={400}
									height={400}
									className="w-full h-full object-cover rounded-xl"
									style={{
										filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
									}}
								/>
							</div>
						</div>
					</div>

					<div className="w-full md:w-3/5 space-y-6">
						<h3 className="text-2xl md:text-3xl font-bold text-slate-900">
							Dr Forum Gada
						</h3>
						<p className="text-cyan-600 font-medium">
							CHIEF DENTIST
						</p>

						<div className="space-y-4 text-slate-700">
							<p>
								Dr. Forum Gada, a distinguished dentist based in Malad, Mumbai, is renowned for her expertise in cosmetic dentistry and full mouth rehabilitation. With a commitment to enhancing smiles and restoring oral health, Dr. Gada combines precision and artistry in her practice. Specializing in cosmetic dentistry, she excels in procedures that not only prioritize aesthetics but also ensure optimal functionality.
							</p>
							<p>
								Patients seeking a transformative dental experience turn to Dr. Forum Gada for her comprehensive approach to full mouth rehabilitation. Her dedication to staying abreast of the latest advancements in dentistry, coupled with a compassionate and patient-centric approach, sets her apart in the field. Whether it's teeth whitening, veneers, or complex rehabilitation cases, Dr. Gada's skillful hands and warm demeanor make her a trusted professional in the realm of dental care. Embrace a confident and radiant smile under the care of Dr. Forum Gada, where expertise meets personalized attention in the heart of Malad, Mumbai
							</p>
							<p className="italic border-l-4 border-cyan-200 pl-4">
								"My passion is helping patients achieve the smile they've
								always dreamed of. There's nothing more rewarding than seeing
								someone's confidence transform along with their smile."
							</p>
						</div>
						{/* <div className="flex flex-row gap-4 pt-2">
							<div className="flex items-center gap-2 bg-cyan-50 px-3 py-1 rounded-full">
								<Award className="h-4 w-4 text-cyan-600" />
								<span className="text-sm font-medium text-cyan-700">
									10+ Years Experience
								</span>
							</div>
							<div className="flex items-center gap-2 bg-cyan-50 px-3 py-1 rounded-full">
								<ThumbsUp className="h-4 w-4 text-cyan-600" />
								<span className="text-sm font-medium text-cyan-700">
									5000+ Happy Patients
								</span>
							</div>
						</div> */}
						<div className="flex justify-end">
							<Button
								className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white flex items-center gap-2 transition-all"
								onClick={() => window.open("https://smileculturemumbai.in/our-team/", "_blank")}
							>
								Know More <ArrowRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorSection;