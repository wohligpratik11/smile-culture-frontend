import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../components/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
// import Polygon from '../../../public/assets/images/polygon.webp';
const SceneSelector = () => {
	const router = useRouter();
	const features = [
		{
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			description: 'Advanced face swapping technology',
			path: '/swapping/face-swap',
		},
		{
			title: 'Lip-syncing',
			image: '/assets/images/lipsyncing.webp',
			description: 'Precise lip synchronization',
			path: '/swapping/lip-syncing',

		},
		{
			title: 'Multilingual',
			image: '/assets/images/multilingual.webp',
			description: 'Support for multiple languages',
			path: '/swapping/multilingual',

		},
	];

	const handleBackClick = () => {
		router.back();
	};

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="relative">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
							onClick={handleBackClick}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
					</div>
					<div className="flex justify-center space-x-4">
						<div className="text-customWhite text-4xl font-semibold w-913 text-center">
							Live Your Movie Dream—Step Into the Spotlight!
						</div>
						{/* <div >
							<img
								src="/assets/images/polygon.webp"
								alt={`Polygon image`}
								className="w-full h-full object-cover"
							/></div> */}
					</div>
					<div className="flex justify-center space-x-4 mt-6">
						<div className="text-customWhite text-xl leading-7 w-1004 text-center">
							Transform iconic movie scenes with your image and become the star you’ve always dreamed of. Add your personal touch to the dialogue and create unforgettable moments!
						</div>
					</div>
					<div className="flex justify-center space-x-4 mt-6">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12"
							onClick={handleBackClick}
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
												className="bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 mb-6"
												aria-label={`Go to ${feature.title}`}
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
										<div
											className="flex items-center justify-center text-center text-white text-lg font-medium h-14 border border-slateBlue rounded-2xl"
											style={{
												background: 'linear-gradient(180deg, rgba(49, 58, 91, 0) -1.11%, rgba(49, 58, 91, 0.44) 23.83%, #313A5B 99.56%)',
											}}
										>
											{feature.title}
										</div>

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

export default SceneSelector;
