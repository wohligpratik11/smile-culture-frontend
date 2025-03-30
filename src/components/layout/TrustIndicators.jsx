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
	Smile
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const HeroSection = () => {
	const router = useRouter();

	return (
		<div className="bg-white py-8 border-y border-slate-100">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
					<div className="flex flex-col items-center text-center">
						<div className="bg-cyan-50 p-3 rounded-full mb-3">
							<Star className="h-6 w-6 text-cyan-600" />
						</div>
						<p className="text-2xl font-bold text-slate-900">5/5</p>
						<p className="text-sm text-slate-600">Patient Satisfaction</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="bg-cyan-50 p-3 rounded-full mb-3">
							<Users className="h-6 w-6 text-cyan-600" />
						</div>
						<p className="text-2xl font-bold text-slate-900">50,000+</p>
						<p className="text-sm text-slate-600">Smiles Transformed</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="bg-cyan-50 p-3 rounded-full mb-3">
							<BadgeCheck className="h-6 w-6 text-cyan-600" />
						</div>
						<p className="text-2xl font-bold text-slate-900">12+</p>
						<p className="text-sm text-slate-600">Years Experience</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="bg-cyan-50 p-3 rounded-full mb-3">
							<Smile className="h-6 w-6 text-cyan-600" />
						</div>
						<p className="text-2xl font-bold text-slate-900">100%</p>
						<p className="text-sm text-slate-600">Gentle Care Promise</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;