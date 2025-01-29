import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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

const MoviePage = ({ initialMovies, totalCount, page: initialPage }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [movies, setMovies] = useState(initialMovies);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));

	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
	}, []);

	// Re-fetch movies whenever the page changes
	useEffect(() => {
		const { page } = router.query;
		if (page && parseInt(page) !== currentPage) {
			handlePageChange(parseInt(page));
		}
	}, [router.query.page]);

	// Fetch new movies when page changes
	const handlePageChange = async (page) => {
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
			const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, {
				page,
			});

			// Map API response to features
			setMovies(response?.data?.data?.data || []);
			setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8)); // Recalculate total pages
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	};

	// Handle search input
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Filter movies based on search query
	const filteredMovies = movies.filter((movie) =>
		movie?.feature_used?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleMovieSelect = (movie) => {
		setSelectedMovie((prev) => (prev?.stored_data_id === movie.stored_data_id ? null : movie));
	};

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
		<div className="h-[835px] min-h-screen p-6">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Link href="/">
							<button
								className="bg-gradient-custom-gradient rounded-lg border border-buttonBorder px-4 py-2"
								aria-label="Go Back"
							>
								<ArrowLeft />
							</button>
						</Link>

						<div className="mt-4 text-lg font-medium leading-10">
							<h1 className="mb-4 text-2xl font-medium capitalize leading-10 text-customWhite">
								View All
							</h1>
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

					<div
						className={`mt-6 ${filteredMovies.length > 0 ? 'grid grid-cols-1 gap-6 md:grid-cols-4' : ''}`}
					>
						{filteredMovies.length === 0 ? (
							<div className="flex h-full items-center justify-center">
								No Movie found
							</div>
						) : (
							filteredMovies.map((movie) => (
								<div key={movie.stored_data_id} className="space-y-2 text-center">
									<Card
										className={`bg-blue-800/20 relative mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105`}
										aria-label={`Select ${movie.feature_used}`}
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												{movie.mode === 'video' ? (
													<video
														controls
														preload="auto"
														width="100%"
														height="auto"
														playsInline
														title="Description"
														controlsList="nodownload noplaybackrate"
														disablePictureInPicture
														className="w-full h-full object-contain rounded-lg "
													>
														<source src={movie.output_video_url} type="video/mp4" />
													</video>
												) : (
													<Image
														src={movie.output_video_url || '/fallback-image.jpg'}
														alt={`${movie.feature_used} image`}
														layout="fill"
														objectFit="contain"
														priority={true}
													/>
												)}
											</AspectRatio>
										</CardContent>

									</Card>
									<div className="text-sm font-bold text-customWhite">
										{movie.character?.map((character, index) => (
											<span key={index} className="block">
												{character.character_movie_name}
											</span>
										))}
									</div>
								</div>
							))
						)}
					</div>
				</div>
				<div className="flex justify-between items-center mt-6 flex-col sm:flex-row">
					<div
						className={`flex justify-center items-center space-x-2 sm:flex-1 md:ml-36 flex-wrap sm:space-x-2 `}
					>
						<button
							className={`bg-gradient-custom-gradient hover:bg-blue-600 focus:ring-blue-300 rounded-md border border-buttonBorder px-4 py-2 text-white transition-all duration-200 focus:outline-none focus:ring-2 ${currentPage <= 1 ? 'cursor-not-allowed opacity-50' : ''
								}`}
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage <= 1}
						>
							<ChevronLeft className="h-5 w-5" />
						</button>

						{[...Array(totalPages)].map((_, index) => {
							const page = index + 1;
							const isActive = currentPage === page;
							return (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`focus:ring-blue-300 rounded-md px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 ${isActive
										? 'hover:bg-blue-100 hover:border-blue-500 bg-white text-lg font-bold text-blue hover:border'
										: 'bg-gradient-custom-gradient border border-buttonBorder text-white'
										}`}
								>
									{page}
								</button>
							);
						})}

						<button
							className={`bg-gradient-custom-gradient hover:bg-blue-600 focus:ring-blue-300 rounded-md border border-buttonBorder px-4 py-2 text-white transition-all duration-200 focus:outline-none focus:ring-2 ${currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : ''
								}`}
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>

				</div>
			</Card>
		</div>
	);
};

// Server-side fetching
export async function getServerSideProps(context) {
	const { query } = context;
	const page = query.page || 1;

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, { page });

		return {
			props: {
				initialMovies: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: parseInt(page, 10),
			},
		};
	} catch (error) {
		console.error('Error fetching movies:', error);
		return {
			props: {
				initialMovies: [],
				totalCount: 0,
				page: 1,
			},
		};
	}
}

export default MoviePage;
