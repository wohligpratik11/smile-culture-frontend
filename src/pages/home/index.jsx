import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../components/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

const Home = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [loginMessage, setLoginMessage] = useState('');

	const features = [
		{
			title: 'face-Swap',
			image: '/assets/images/faceswap.webp',
			description: 'Advanced face swapping technology',
			path: '/movie',
		},
		{
			title: 'lip-syncing',
			image: '/assets/images/lipsyncing.webp',
			description: 'Precise lip synchronization',
			path: '/movie',
		},
		{
			title: 'multilingual',
			image: '/assets/images/multilingual.webp',
			description: 'Support for multiple languages',
			path: '/movie',
		},
	];

	const handleBackClick = () => {
		router.back();
	};

	const handleHomeBackClick = () => {
		router.push('https://erosnow.com/');
	};

	const handleFeatureClick = (feature) => {
		Cookies.set('title', feature?.title);
	};

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4 mt-4">
					{/* <div className="relative">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
							onClick={handleHomeBackClick}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
					</div> */}
					<div className="flex justify-center space-x-4">
						<div className="text-customWhite text-4xl font-semibold w-913 text-center">
							Live Your Movie Dream—Step Into the Spotlight!
						</div>
					</div>
					<div className="flex justify-center space-x-4 mt-6">
						<div className="text-customWhite text-xl leading-7 w-1004 text-center">
							Transform iconic movie scenes with your image and become the star you’ve always dreamed of. Add your personal touch to the dialogue and create unforgettable moments!
						</div>
					</div>
					<div className="flex justify-center space-x-4 mt-6">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12"
						>
							Get Started
						</button>
					</div>
					<div className="flex items-center justify-center">
						<div className="max-w-7xl mx-auto">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
								{features.map((feature) => (
									<div key={feature.title} className="space-y-2">
										<Link href={feature.path} passHref legacyBehavior>
											<Card
												className="bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden transform transition-transform duration-200 hover:scale-105 mb-6 cursor-pointer"
												aria-label={`Go to ${feature.title}`}
												onClick={() => handleFeatureClick(feature)}
											>
												<CardContent className="p-0">
													<div className="relative aspect-video">
														<img
															src={feature.image}
															alt={`${feature.title} image`}
															className="w-full h-full object-cover"
														/>
													</div>
												</CardContent>
											</Card>
										</Link>
										<Link href={feature.path} passHref legacyBehavior>
											<div
												className="flex items-center justify-center text-center text-white text-lg font-medium h-14 border border-slateBlue rounded-2xl cursor-pointer capitalize"
												style={{
													background:
														'linear-gradient(180deg, rgba(49, 58, 91, 0) -1.11%, rgba(49, 58, 91, 0.44) 23.83%, #313A5B 99.56%)',
												}}
											>
												{feature.title}
											</div>
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Home;
