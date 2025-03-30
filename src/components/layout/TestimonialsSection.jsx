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
const TestimonialsSection = () => {
	const router = useRouter();

	return (
		<div className="bg-slate-50 py-16">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 px-3 py-1 text-sm font-medium rounded-full mb-4">
						PATIENT STORIES
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
						Smiles We've Transformed
					</h2>
					<p className="text-slate-600 text-lg">
						Hear from our satisfied patients who have experienced the
						life-changing effects of our dental veneers
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{[1, 2, 3].map((i) => (
						<Card
							key={i}
							className="p-6 border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
						>
							<div className="space-y-4">
								<div className="flex gap-1">
									{[...Array(5)].map((_, j) => (
										<svg
											key={j}
											className="w-5 h-5 text-yellow-400"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>

								<p className="text-slate-700 italic">
									"I never thought my smile could look this good. The veneers
									look completely natural, and the process was much easier
									than I expected!"
								</p>

								<div className="flex items-center gap-3 pt-2">
									<div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
										<span className="text-cyan-700 font-medium">
											{String.fromCharCode(65 + i - 1)}
										</span>
									</div>
									<div>
										<p className="font-medium text-slate-900">Patient {i}</p>
										<p className="text-sm text-slate-500">Dental Veneers</p>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default TestimonialsSection;