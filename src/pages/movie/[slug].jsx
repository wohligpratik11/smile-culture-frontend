import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../components/components/ui/input'; // Import ShadCN Input
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';

const DynamicSlugPage = ({ movies }) => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const { slug } = router.query;

	const features = movies?.map(movie => ({
		id: movie.movie_id,
		title: movie.movie_name,
		name: movie.movie_name,
		image: movie.thumbnail,
		path: `/scenes/${movie.movie_id}`,
	}));


	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredFeatures = features.filter((feature) =>
		feature?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const renderHeader = () => {
		switch (slug) {
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
							onClick={() => router.back()}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
						<div className="text-lg font-medium leading-10 mt-[17px]">
							{renderHeader()}
						</div>
					</div>

					<div className="relative mt-4">
						<CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold text-customWhite h-full w-6" />
						<Input
							type="text"
							placeholder="Search"
							value={searchQuery}
							onChange={handleSearchChange}
							className="w-full pl-12 pr-3 py-3 border-none bg-blueYonder rounded-full text-customWhite placeholder-customWhite"
						/>
					</div>
					<div className="relative mt-4">
						Choose Movie
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
						{filteredFeatures.length === 0 ? (
							<div>No features found</div>
						) : (
							filteredFeatures.map((feature) => (
								<div key={feature.path} className="space-y-2">
									<Link href={`${feature.path}`} passHref legacyBehavior>
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
							))
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	console.log('Inside getServerSideProps');
	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_ALL_MOVIES_LIST, {
			page: 1,
		});
		console.log('Fetched movies:', response?.data?.data);
		return {
			props: {
				movies: response?.data?.data?.data,
			},
		};
	} catch (error) {
		console.error('Error fetching movies:', error);
		return {
			props: {
				movies: [],
			},
		};
	}
}



export default DynamicSlugPage;
