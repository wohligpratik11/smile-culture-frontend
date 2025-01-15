import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from "../../components/components/ui/aspect-ratio";

const ScenesPage = ({ initialScenes, totalCount, page: initialPage, id, prefetchNextPageData }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedScenes, setSelectedScenes] = useState(null);
	const [scenes, setScenes] = useState(initialScenes);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));
	const [selectedTab, setSelectedTab] = useState('scene');
	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
		Cookie.set('mode', 'video');
	}, []);

	useEffect(() => {
		const { page } = router.query;
		if (page && parseInt(page) !== currentPage) {
			handlePageChange(parseInt(page));
		}
	}, [router.query.page]);

	const handlePageChange = useCallback(async (page) => {
		if (page < 1 || page > totalPages) return;

		router.push({
			pathname: router.pathname,
			query: { ...router.query, page },
		}, undefined, { shallow: true });

		setCurrentPage(page);

		try {
			const axios = axiosInstance();
			const response = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, { page, movie_id: id });

			setScenes(response?.data?.data?.data || []);
			setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
		} catch (error) {
			console.error('Error fetching Scene:', error);
		}
	}, [router, totalPages, id]);

	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);

	const filteredFeatures = scenes?.filter((feature) =>
		feature?.scene_name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleScenesSelect = (scene) => {
		setSelectedScenes(prev => (prev?.scene_id === scene.scene_id ? null : scene));
	};



	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Link href="#" passHref>
							<button
								className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
								onClick={(e) => {
									e.preventDefault();
									router.back();
								}}
								aria-label="Go Back"
							>
								<ArrowLeft />
							</button>
						</Link>

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
					<div className="flex space-x-2">
						<button
							className={`px-6 py-2 rounded-full text-white font-semibold transition-colors duration-200 ${selectedTab === 'scene' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'border border-slateBlue cursor-pointer transition-all bg-blueYonder'}`}
							onClick={() => {
								setSelectedTab('scene');
								Cookie.set('mode', 'video');
							}}

						>
							Scene
						</button>
						<button
							className={`px-6 py-2 rounded-full text-white font-semibold transition-colors duration-200 ${selectedTab === 'image' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'border border-slateBlue cursor-pointer transition-all bg-blueYonder'}`}
							onClick={() => {
								setSelectedTab('image');
								Cookie.set('mode', 'image');
							}}	>
							Image
						</button>
					</div>
					<div className="flex items-center justify-between mt-4">
						{/* Left Aligned Text */}
						<div className="text-lg font-semibold">
							{selectedTab === 'scene' ? 'Choose Scene' : 'Choose Image'}
						</div>


					</div>

					{selectedTab === 'image' ? (
						<div className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-1 md:grid-cols-4 gap-6' : ''}`}>
							{filteredFeatures.map((feature) => (
								<div key={feature.path} className="space-y-2">
									<Card
										className={`bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 mb-2 ${selectedScenes?.scene_id === feature.scene_id ? 'border-buttonBorder border border-solid' : ''}`}
										aria-label={`Select ${feature.scene_name}`}
										onClick={() => handleScenesSelect(feature)}
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												<Image
													src={feature.thumbnailUrl || '/fallback-image.jpg'}
													alt={`${feature.scene_name} image`}
													layout="fill"
													objectFit="contain"
													priority={true}
												/>

											</AspectRatio>
										</CardContent>
									</Card>
									<p className="text-sm text-customWhite font-bold text-center">{feature.scene_name}</p>
								</div>
							))}

						</div>
					) : (
						<div className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-1 md:grid-cols-4 gap-6' : ''}`}>
							{filteredFeatures.length === 0 ? (
								<div className="flex justify-center items-center h-full">No Scene found</div>
							) : (
								filteredFeatures.map((feature) => (
									<div key={feature.path} className="space-y-2">
										<Card
											className={`bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 mb-2 ${selectedScenes?.scene_id === feature.scene_id ? 'border-buttonBorder border border-solid' : ''}`}
											aria-label={`Select ${feature.scene_name}`}
											onClick={() => handleScenesSelect(feature)}
										>
											<CardContent className="p-0">
												<AspectRatio ratio={16 / 9} className="w-full">
													<video
														src={feature.videoUrl}
														controls
														controlsList="nodownload"
														disablePictureInPicture
														className="w-full h-full object-contain"
														aria-label={`Video for ${feature.scene_name}`}
													/>
												</AspectRatio>
											</CardContent>
										</Card>
										{/* Scene name displayed below the card */}
										<p className="text-sm text-customWhite font-bold text-center">{feature.scene_name}</p>
									</div>
								))

							)}
						</div>
					)}
				</div>

				<div className="flex justify-between items-center mt-6">
					<div className={`flex justify-center items-center space-x-2 flex-1 ${selectedScenes ? 'ml-36' : ''}`}>
						<button
							className={`px-4 py-2 rounded-md bg-gradient-custom-gradient border border-buttonBorder text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage <= 1}
						>
							<ChevronLeft className="w-5 h-5" />
						</button>

						{[...Array(totalPages)].map((_, index) => {
							const page = index + 1;
							const isActive = currentPage === page;
							return (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isActive
										? 'bg-gradient-custom-gradient border border-buttonBorder text-white'
										: 'bg-white text-blue-600 hover:bg-blue-100 hover:border hover:border-blue-500'
										}`}
								>
									{page}
								</button>
							);
						})}

						<button
							className={`px-4 py-2 rounded-md bg-gradient-custom-gradient border border-buttonBorder text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>

					{selectedScenes && (
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12 ml-4"
							onClick={() => {
								if (selectedScenes) {
									router.push(`/characters/${selectedScenes.scene_id}`);
								}
							}}
							disabled={!selectedScenes}
						>
							Next
						</button>
					)}
				</div>
			</Card >
		</div >
	);
};

export async function getServerSideProps(context) {
	const { query } = context;
	const page = query.page || 1;
	const { id } = context.params;

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, { page, movie_id: id });

		// Prefetch next page
		const nextPage = page + 1;
		const nextResponse = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, { page: nextPage, movie_id: id });

		return {
			props: {
				initialScenes: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: parseInt(page, 10),
				id,
				prefetchNextPageData: nextResponse?.data?.data?.data || [],
			},
		};
	} catch (error) {
		console.error('Error fetching scenes:', error);
		return {
			props: {
				initialScenes: [],
				totalCount: 0,
				page: 1,
				id: null,
				prefetchNextPageData: [],
			},
		};
	}
}

export default ScenesPage;
