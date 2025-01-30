import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import Pagination from '../../components/components/ui/pagination';

const ScenesPage = ({
	initialScenes,
	totalCount,
	page: initialPage,
	id,
	prefetchNextPageData,
}) => {
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

	const handlePageChange = useCallback(
		async (page) => {
			if (page < 1 || page > totalPages) return;

			router.push(
				{
					pathname: router.pathname,
					query: { ...router.query, page },
				},
				undefined,
				{ shallow: true }
			);

			setCurrentPage(page);

			try {
				const axios = axiosInstance();
				const response = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, {
					page,
					movie_id: id,
				});

				setScenes(response?.data?.data?.data || []);
				setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
			} catch (error) {
				console.error('Error fetching Scene:', error);
			}
		},
		[router, totalPages, id]
	);

	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);

	const filteredFeatures = scenes?.filter((feature) =>
		feature?.scene_name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleScenesSelect = (scene) => {
		console.log('Scene clicked:', scene); // Log the selected scene
		setSelectedScenes((prev) => {
			const updatedScene = prev?.scene_id === scene.scene_id ? null : scene;
			console.log('Updated selected scene:', updatedScene); // Log the updated scene
			return updatedScene;
		});
	};

	const handleTabChange = (tab) => {
		setSelectedTab(tab);
		setSelectedScenes(null);
	};
	useEffect(() => {
		if (selectedTab === 'scene') {
			Cookie.set('mode', 'video');
		} else if (selectedTab === 'image') {
			Cookie.set('mode', 'image');
		}

		setSelectedScenes(null);
	}, [selectedTab]);

	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (char) => char.toUpperCase());
			return (
				<h1 className="mb-4 text-2xl font-medium capitalize leading-10 text-customWhite">
					{formattedTitle}
				</h1>
			);
		}
		return (
			<h1 className="mb-4 text-2xl font-medium capitalize leading-10 text-customWhite">
				Loading...
			</h1>
		);
	};

	return (
		<div className="h-[835px] min-h-screen p-4">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Link href="#" passHref>
							<button
								className="bg-gradient-custom-gradient rounded-lg border border-buttonBorder px-4 py-2"
								onClick={(e) => {
									e.preventDefault();
									router.back();
								}}
								aria-label="Go Back"
							>
								<ArrowLeft />
							</button>
						</Link>

						<div className="mt-4 text-lg font-medium leading-10">
							{renderHeader()}
						</div>
					</div>

					<div className="relative mt-4">
						<CiSearch className="absolute left-4 top-1/2 h-full w-6 -translate-y-1/2 transform font-bold text-customWhite" />
						<Input
							type="text"
							placeholder="Search"
							value={searchQuery}
							onChange={handleSearchChange}
							className="w-full rounded-full border-none bg-blueYonder py-3 pl-12 pr-3 text-customWhite placeholder-customWhite"
						/>
					</div>

					<div className="flex space-x-2">
						<button
							className={`rounded-full px-6 py-2 font-semibold text-white transition-colors duration-200 ${selectedTab === 'scene' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'cursor-pointer border border-slateBlue bg-blueYonder transition-all'}`}
							onClick={() => {
								setSelectedTab('scene');
								Cookie.set('mode', 'video');
							}}
						>
							Scenes
						</button>
						<button
							className={`rounded-full px-6 py-2 font-semibold text-white transition-colors duration-200 ${selectedTab === 'image' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'cursor-pointer border border-slateBlue bg-blueYonder transition-all'}`}
							onClick={() => {
								setSelectedTab('image');
								Cookie.set('mode', 'image');
							}}
						>
							Images
						</button>
					</div>

					<div className="mt-4 flex items-center justify-between">
						<div className="relative text-lg font-semibold !text-customWhite">
							{selectedTab === 'scene' ? 'Choose Scene' : 'Choose Image'}
						</div>
					</div>

					{selectedTab === 'image' ? (
						<div
							className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-2 gap-6 md:grid-cols-4' : ''}`}
						>
							{filteredFeatures.map((feature) => (
								<div key={feature.path} className="space-y-2">
									<Card
										className={`bg-blue-800/20 mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ${selectedScenes?.scene_id === feature.scene_id ? 'border border-solid border-buttonBorder' : ''}`}
										aria-label={`Select ${feature.scene_name}`}
										onClick={() => handleScenesSelect(feature)}
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												<Image
													src={feature.compressed_thumbnail_url || '/fallback-image.jpg'}
													alt={`${feature.scene_name} image`}
													width={500}
													height={500}
													quality={100}
													objectFit="contain"
													priority={true}
												/>
											</AspectRatio>
										</CardContent>
									</Card>
									<p className="text-center text-sm font-bold text-customWhite">
										{feature.scene_name}
									</p>
								</div>
							))}
						</div>
					) : (
						<div
							className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-1 gap-6 md:grid-cols-4' : ''}`}
						>
							{filteredFeatures.length === 0 ? (
								<div className="flex h-full items-center justify-center">
									No Scene found
								</div>
							) : (
								filteredFeatures.map((feature) => (
									<div key={feature.path} className="space-y-2">
										<Card
											className={`bg-blue-800/20 mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ${selectedScenes?.scene_id === feature.scene_id ? 'border border-solid border-buttonBorder' : ''}`}

											aria-label={`Select ${feature.scene_name}`}
											onClick={() => handleScenesSelect(feature)}
										>
											<CardContent className="p-0">
												<AspectRatio ratio={16 / 9} className="w-full">
													<video
														src={feature.compressed_video_url}
														controls
														playsInline
														title="Description"
														controlsList="nodownload noplaybackrate"
														disablePictureInPicture
														className="h-full w-full object-contain"
														aria-label={`Video for ${feature.scene_name}`}
													/>
												</AspectRatio>
											</CardContent>
										</Card>
										<p className="text-center text-sm font-bold text-customWhite">
											{feature.scene_name}
										</p>
									</div>
								))
							)}
						</div>
					)}
				</div>
				<div className="flex justify-between items-center mt-6 flex-col sm:flex-row">
					<div
						className={`flex justify-center items-center space-x-2 sm:flex-1  flex-wrap sm:space-x-2 ${selectedScenes ? 'md:ml-36' : ''}`}
					>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
					{selectedScenes && (
						<button
							className="bg-gradient-custom-gradient mt-4 h-12 w-52 rounded-lg border border-buttonBorder px-4 py-2 sm:ml-4 sm:mt-0"
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
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { query } = context;
	const page = query.page || 1;
	const { id } = context.params;

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, {
			page,
			movie_id: id,
		});

		// Prefetch next page
		const nextPage = page + 1;
		const nextResponse = await axios.post(API_ENDPOINTS.GET_ALL_SCENE_LIST, {
			page: nextPage,
			movie_id: id,
		});

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

