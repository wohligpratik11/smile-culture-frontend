import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const DynamicSlugPage = () => {
	const router = useRouter();
	const features = [
		{
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		},
		{
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		}, {
			title: 'Face Swapping',
			image: '/assets/images/faceswap.webp',
			path: '/swapping/face-swap',
		},
	];
	const { slug } = router.query;
	const [pageType, setPageType] = useState('');

	useEffect(() => {
		// Determine which feature we're dealing with based on the URL path
		if (router.pathname.includes('swapping')) {
			setPageType('face-swap');
		} else if (router.pathname.includes('lip-syncing')) {
			setPageType('lip-syncing');
		} else if (router.pathname.includes('multilingual')) {
			setPageType('multilingual');
		}
	}, [router.pathname]);

	const handleBackClick = () => {
		router.back();
	};

	const renderHeader = () => {
		switch (pageType) {
			case 'face-swap':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Face Swapping</h1>;
			case 'lip-syncing':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Lip Syncing</h1>;
			case 'multilingual':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Multilingual</h1>;
			default:
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Loading...</h1>;
		}
	};


	if (!slug) return <div>Loading...</div>;

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
							onClick={handleBackClick}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
						<div className="mt-[17px]">
							{renderHeader()}
						</div>
					</div>


					<div className="flex items-center justify-center">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
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
								</div>

							))}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DynamicSlugPage;
