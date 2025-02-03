import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';
import { ArrowLeft } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import Pagination from '../../components/components/ui/pagination';
import ShareLink from '../../components/components/ui/shareLink';

const MoviePage = ({ initialMovies, totalCount, page: initialPage }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [movies, setMovies] = useState(initialMovies);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));
	const [selectedTab, setSelectedTab] = useState('video');
	const [isOpen, setIsOpen] = useState(false);
	const [videoUrl, setVideoUrl] = useState(null);
	const videoRefs = useRef({});

	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
	}, []);

	useEffect(() => {
		const { page } = router.query;
		if (page && parseInt(page) !== currentPage) {
			handlePageChange(parseInt(page));
		}
	}, [router.query.page]);

	const handleShareClick = (movie) => {
		setIsOpen(true);
		setVideoUrl(movie.output_video_url);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const axios = axiosInstance();
				const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, {
					page: currentPage,
					mode: selectedTab,
				});
				setMovies(response?.data?.data?.data || []);
				setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
			} catch (error) {
				console.error('Error fetching movies:', error);
			}
		};
		if (selectedTab) {
			fetchMovies();
		}
	}, [selectedTab, currentPage]);
	const handleMouseEnter = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			// Reset the video to start
			videoElement.currentTime = 0;
			// Create a play promise to handle iOS requirements
			const playPromise = videoElement.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {
					console.log("Playback error:", error);
				});
			}
		}
	};
	const handlePlayPauseClick = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			if (isPlaying) {
				const pausePromise = videoElement.pause();
				if (pausePromise !== undefined) {
					pausePromise.catch(error => {
						console.log("Pause error:", error);
					});
				}
			} else {
				const playPromise = videoElement.play();
				if (playPromise !== undefined) {
					playPromise.catch(error => {
						console.log("Play error:", error);
					});
				}
			}
			setIsPlaying(!isPlaying);
		}
	}

	const handleMouseLeave = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			videoElement.pause();
		}
	};
	const handlePageChange = async (page) => {
		if (page < 1 || page > totalPages) return;

		setCurrentPage(page);

		try {
			const axios = axiosInstance();
			const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, {
				page,
				mode: selectedTab,
			});

			setMovies(response?.data?.data?.data || []);
			setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
		} catch (error) {
			console.error('Error fetching movies:', error);
		}
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredMovies = movies.filter((movie) =>
		movie?.feature_used?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleMovieSelect = (movie) => {
		setSelectedMovie((prev) => (prev?.stored_data_id === movie.stored_data_id ? null : movie));
	};

	return (
		<div className="h-[835px] min-h-screen p-4">
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
								My Creations
							</h1>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-4 mt-4">
						{/* Tab Buttons */}
						<div className="flex space-x-2">
							<button
								className={`rounded-full px-6 py-2 font-semibold text-white transition-colors duration-200 ${selectedTab === 'video' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'cursor-pointer border border-slateBlue bg-blueYonder transition-all'}`}
								onClick={() => {
									setSelectedTab('video');
								}}
							>
								Scenes
							</button>
							<button
								className={`rounded-full px-6 py-2 font-semibold text-white transition-colors duration-200 ${selectedTab === 'image' ? 'bg-gradient-custom-gradient border border-buttonBorder' : 'cursor-pointer border border-slateBlue bg-blueYonder transition-all'}`}
								onClick={() => {
									setSelectedTab('image');
								}}
							>
								Images
							</button>
						</div>

						{/* Search Input */}
						<div className="relative flex-grow mt-4 sm:mt-0">
							<CiSearch className="absolute left-4 top-1/2 h-full w-6 -translate-y-1/2 transform font-bold text-customWhite" />
							<Input
								type="text"
								placeholder="Search"
								value={searchQuery}
								onChange={handleSearchChange}
								className="w-full rounded-full border-none bg-blueYonder py-3 pl-12 pr-3 text-customWhite placeholder-customWhite"
							/>
						</div>
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
										onClick={() => handleMovieSelect(movie)}  // Optional: Handle selection of movie
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												{movie.mode === 'video' ? (
													<video
														ref={(el) => { videoRefs.current[movie.stored_data_id] = el }}
														controls
														preload="auto"
														width="100%"
														height="auto"
														playsInline
														title="Description"
														controlsList="nodownload noplaybackrate"
														disablePictureInPicture
														className="w-full h-full object-contain rounded-lg "
														onMouseEnter={() => handleMouseEnter(movie.stored_data_id)}
														onMouseLeave={() => handleMouseLeave(movie.stored_data_id)}
														poster={movie.output_video_url}
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
												<div className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 rounded-full">
													<FiShare2 className="text-white text-2xl cursor-pointer" onClick={() => handleShareClick(movie)} />
												</div>
											</AspectRatio>
										</CardContent>
									</Card>

									<div className="text-sm font-bold text-customWhite">
										<span className="block">
											{movie?.character_movie_name}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</div>
				<div className="flex justify-center items-center mt-6 flex-col sm:flex-row ">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
				<ShareLink isOpen={isOpen} onClose={handleModalClose} movies={videoUrl} />
			</Card>
		</div>
	);
};

// Server-side fetching remains unchanged
export async function getServerSideProps(context) {
	const { query } = context;
	const page = query.page || 1;

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, { page, mode: 'video' });

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
