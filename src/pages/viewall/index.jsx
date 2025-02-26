import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IoMdEye } from "react-icons/io";
import { FaExpand } from "react-icons/fa";
import { CiSearch } from 'react-icons/ci';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import InfiniteScroll from '../../components/components/ui/InfiniteScroll';
import ShareLink from '../../components/components/ui/shareLink';
import FullscreenModal from '../../components/components/ui/fullscreen';
import { RiShareForwardLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";

const MoviePage = ({ initialMovies, totalCount, page: initialPage }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [movies, setMovies] = useState(initialMovies);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [selectedTab, setSelectedTab] = useState('video');
	const [isOpen, setIsOpen] = useState(false);
	const [videoUrl, setVideoUrl] = useState(null);
	const [fullscreenModal, setFullscreenModal] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const videoRefs = useRef({});
	const [isPlaying, setIsPlaying] = useState(false);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const scrollContainerRef = useRef(null);

	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
	}, []);

	useEffect(() => {
		// Reset movies when tab changes
		setMovies([]);
		setCurrentPage(1);
		setHasMore(true);
		fetchMovies(1, true, selectedTab);
	}, [selectedTab]);

	const fetchMovies = async (page, replace = false, tabType = selectedTab) => {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			const axios = axiosInstance();
			const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, {
				page,
				mode: tabType,
			});

			console.log('Fetched data for tab:', tabType, response?.data?.data);

			const newMovies = response?.data?.data?.data || [];
			const total = response?.data?.data?.totalCount || 0;

			if (newMovies.length === 0) {
				setHasMore(false);
			} else {
				setMovies(prev => replace ? newMovies : [...prev, ...newMovies]);
				setHasMore(page < Math.ceil(total / 8));
			}
		} catch (error) {
			console.error('Error fetching movies:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadMoreItems = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		fetchMovies(nextPage, false, selectedTab);
	};

	const handleShareClick = (movie, event) => {
		event.stopPropagation();
		setIsOpen(true);
		setVideoUrl(movie.output_video_url);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};

	const handleMouseEnter = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			videoElement.currentTime = 0; // Reset video to start
			const playPromise = videoElement.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {
					console.log("Playback error:", error);
				});
			}
		}
	};

	const handleMouseLeave = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			const pausePromise = videoElement.pause();
			if (pausePromise !== undefined) {
				pausePromise.catch(error => {
					console.log("Pause error:", error);
				});
			}
		}
	};

	const handleTouchOrClick = (stored_data_id) => {
		const videoElement = videoRefs.current[stored_data_id];
		if (videoElement) {
			// Toggle play/pause on click
			if (isPlaying) {
				const pausePromise = videoElement.pause();
				if (pausePromise !== undefined) {
					pausePromise.catch((error) => {
						console.log("Pause error:", error);
					});
				}
			} else {
				const playPromise = videoElement.play();
				if (playPromise !== undefined) {
					playPromise.catch((error) => {
						console.log("Play error:", error);
					});
				}
			}
			setIsPlaying(!isPlaying); // Toggle state
		}
	};

	const handleFullscreenClick = (movie, event) => {
		event.stopPropagation();
		setSelectedMedia(movie);
		setFullscreenModal(true);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Apply filtering to already loaded movies
	const filteredMovies = movies.filter((movie) =>
		movie?.movie_name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleMovieSelect = (movie) => {
		setSelectedMovie((prev) => (prev?.stored_data_id === movie.stored_data_id ? null : movie));
	};

	return (
		<div className="h-[835px] min-h-screen p-4 overflow-hidden">
			<div className="sticky top-0 z-10 rounded-t-xl bg-card-cardCustomBlue p-4 pb-4">
				{/* Header with back button */}
				<div className="flex items-center gap-4">
					<Link href="/">
						<button
							className="bg-gradient-custom-gradient rounded-lg hover:border hover:border-buttonBorder px-4 py-2"
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

				{/* Tab buttons and search - also sticky */}
				<div className="flex flex-wrap items-center gap-4 mt-4">
					<div className="flex space-x-2">
						<button
							className={`rounded-full px-6 py-2 font-semibold text-white transition-colors duration-200 ${selectedTab === 'video' ? 'bg-gradient-custom-gradient hover:border hover:border-buttonBorder' : 'cursor-pointer border border-slateBlue bg-blueYonder transition-all'}`}
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
							placeholder={selectedTab === 'video' ? 'Search for Scenes' : 'Search for Images'}
							value={searchQuery}
							onChange={handleSearchChange}
							maxLength={50}
							className="w-full rounded-full border-none bg-blueYonder py-3 pl-12 pr-3 text-customWhite placeholder-customWhite"
						/>
					</div>
				</div>
			</div>
			<Card className="bg-card-cardCustomBlue p-6 h-full overflow-y-auto" ref={scrollContainerRef}>
				<div className="space-y-4">
					{filteredMovies.length === 0 && !loading ? (
						<div className="flex h-full items-center justify-center mt-6">
							No {selectedTab === 'video' ? 'Scenes' : 'Images'} found
						</div>
					) : (
						<InfiniteScroll
							hasMore={hasMore}
							loadMore={loadMoreItems}
							loading={loading}
							scrollContainerRef={scrollContainerRef}
							className={`grid grid-cols-1 gap-6 md:grid-cols-4`}
							loader={
								<div className="flex justify-center items-center py-4 col-span-full">
									<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
								</div>
							}
						>
							{filteredMovies.map((movie) => (
								<div key={movie.stored_data_id} className="space-y-2 text-center">
									<Card
										className={`bg-blue-800/20 relative mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105`}
										aria-label={`Select ${movie.feature_used}`}
										onClick={() => handleMovieSelect(movie)}
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												{movie.mode === 'video' ? (
													<video
														ref={(el) => { videoRefs.current[movie.stored_data_id] = el }}
														src={movie.output_video_url}
														controls
														playsInline
														muted
														preload="auto"
														controlsList="nodownload noplaybackrate"
														disablePictureInPicture
														className="h-full w-full object-contain"
														aria-label={`Video for ${movie.movie_name}`}
														onMouseEnter={() => handleMouseEnter(movie.stored_data_id)}
														onMouseLeave={() => handleMouseLeave(movie.stored_data_id)}
														onClick={() => handleTouchOrClick(movie.stored_data_id)}
													/>
												) : (
													<Image
														src={movie.output_video_url || '/fallback-image.jpg'}
														alt={`${movie.feature_used} image`}
														width={500}
														height={500}
														objectFit="contain"
														priority={movie.index < 4} // Only prioritize first 4 images
													/>
												)}
												<div
													className="absolute top-2 right-2 z-10 p-2 hover:bg-darkGray bg-opacity-50 rounded-full cursor-pointer"
													onClick={(e) => handleShareClick(movie, e)}
													aria-label="share"
												>
													<RiShareForwardLine className="text-white text-2xl" />
												</div>
												{movie.mode === 'image' && (
													<div
														className="absolute bottom-2 right-2 z-10 p-2 bg-transparent hover:bg-darkGray bg-opacity-50 rounded-full cursor-pointer"
														onClick={(e) => handleFullscreenClick(movie, e)}
														aria-label="Open Fullscreen"
													>
														<FaExpand className="text-white text-2xl" />
													</div>
												)}
											</AspectRatio>
										</CardContent>
									</Card>
									<p className="text-center text-sm font-bold text-customWhite">
										{movie.movie_name}
									</p>
								</div>
							))}
						</InfiniteScroll>
					)}
				</div>

				{/* Share Link Modal */}
				<ShareLink isOpen={isOpen} onClose={handleModalClose} movies={videoUrl} />

				{/* Fullscreen Modal */}
				<FullscreenModal
					isOpen={fullscreenModal}
					onClose={() => setFullscreenModal(false)}
					media={selectedMedia}
				/>
			</Card>
		</div>
	);
};

// Server-side fetching
export async function getServerSideProps(context) {
	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_VIEW_ALL_DATA, {
			page: 1,
			mode: 'video'
		});

		return {
			props: {
				initialMovies: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: 1,
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