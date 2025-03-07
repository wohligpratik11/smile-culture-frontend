import { useRouter } from 'next/router'
import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from '../../components/components/ui/cardborderxl';
import Link from 'next/link';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import MediaUploader from '../../components/components/ui/UppyUploader';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog';
import { AspectRatio } from "../../components/components/ui/aspect-ratio"
import { Button } from "../../components/components/ui/button"
import { RotateCcw, Share } from 'lucide-react'
import ShareLink from '../../components/components/ui/shareLink'
import { useUploadContext } from '../../context/UploadContext';

const ENCRYPTION_KEY = 'your-encryption-key';

const ViewUpload = () => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [mode, setSelectedMode] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [movies, setMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const { uploadedData, characterId } = useUploadContext();

	// Safely decrypt data from cookies
	const safelyDecryptData = (encryptedData, defaultValue = null) => {
		if (!encryptedData) return defaultValue;

		try {
			const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

			if (!decryptedData) return defaultValue;

			return JSON.parse(decryptedData);
		} catch (error) {
			console.error("Decryption error:", error);
			return defaultValue;
		}
	};

	// Safely decrypt URL from cookies
	const safelyDecryptUrl = (encryptedUrl, defaultValue = null) => {
		if (!encryptedUrl) return defaultValue;

		try {
			const bytes = CryptoJS.AES.decrypt(encryptedUrl, ENCRYPTION_KEY);
			const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

			if (!decryptedUrl) return defaultValue;

			return decryptedUrl;
		} catch (error) {
			console.error("URL decryption error:", error);
			return defaultValue;
		}
	};

	// Clear all upload cookies
	const clearAllUploadCookies = () => {
		Cookie.remove('title');
		Cookie.remove('selectedCharacters');
		Cookie.remove('output_video_url');
		Cookie.remove('mode');
	};

	// Handle share dialog
	const handleShareClick = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};

	// Load data from cookies when component mounts
	useEffect(() => {
		setIsLoading(true);

		// Get mode from cookie
		const storedMode = Cookie.get('mode');
		if (storedMode) {
			setSelectedMode(storedMode);
		}

		// Get title from cookie
		const title = Cookie.get('title');
		setTitleFromCookie(title || '');

		// Get selected characters from cookie
		const encryptedCharacters = Cookie.get('selectedCharacters');
		const characters = safelyDecryptData(encryptedCharacters, []);
		setSelectedCharacters(characters);

		// Get video/image URL from cookie
		const encryptedUrl = Cookie.get('output_video_url');
		const mediaUrl = safelyDecryptUrl(encryptedUrl);

		if (mediaUrl) {
			setMovies([mediaUrl]);
			setIsLoading(false);
		} else {
			setError("Media URL couldn't be retrieved. Please try again.");
			setIsLoading(false);
		}

		// Event listener for visibility change
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				// Reload media data when tab becomes visible again
				const refreshedUrl = safelyDecryptUrl(Cookie.get('output_video_url'));
				if (refreshedUrl && (!movies.length || movies[0] !== refreshedUrl)) {
					setMovies([refreshedUrl]);
				}
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []);

	// Handle route changes
	useEffect(() => {
		const handleRouteChange = (url) => {
			if (!url.includes('/upload/viewupload') && !url.includes('/upload')) {
				clearAllUploadCookies();
			}
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router]);

	// Render title with proper formatting
	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

	return (
		<div className="min-h-screen p-4">
			<Card className="bg-card-cardCustomBlue p-4">
				<div className="space-y-4">
					<div className="mx-auto max-w-full sm:max-w-5xl space-y-12 p-2">
						<div className="space-y-6 flex flex-col items-center justify-center">
							<Card>
								{isLoading ? (
									<div className="flex items-center justify-center w-full p-2 border border-slateBlue shadow rounded-xl h-96">
										<p className="text-center text-gray-400 text-2xl">Loading your media...</p>
									</div>
								) : error ? (
									<div className="flex items-center justify-center w-full p-2 border border-slateBlue shadow rounded-xl h-96">
										<p className="text-center text-gray-400 text-2xl">{error}</p>
									</div>
								) : movies && movies.length > 0 ? (
									movies.map((movie, index) => (
										<div key={index} className="space-y-6 flex flex-col items-center justify-center">
											{mode === 'image' ? (
												movie ? (
													<div className="relative w-full h-auto">
														<Image
															src={movie}
															alt="Media"
															className="rounded-lg border border-buttonBorder object-contain"
															layout="responsive"
															width={800}
															height={450}
															priority
															onError={() => setError("Failed to load image. Please try again.")}
														/>
													</div>
												) : (
													<p className="text-center text-gray-400 text-2xl">Oops! Something went wrong. Please try again later.</p>
												)
											) : (
												movie ? (
													<div className="relative w-full h-auto">
														<video
															controls
															preload="auto"
															width="100%"
															height="auto"
															playsInline
															title="Description"
															controlsList="nodownload noplaybackrate"
															disablePictureInPicture
															className="w-full h-full object-contain rounded-lg border border-buttonBorder"
															onError={() => setError("Failed to load video. Please try again.")}
														>
															<source src={movie} type="video/mp4" />
															Your browser does not support the video tag.
														</video>
													</div>
												) : (
													<div className="text-center text-gray-400">Video not available</div>
												)
											)}
										</div>
									))
								) : (
									<div className="flex items-center justify-center w-full p-2 border border-slateBlue shadow rounded-xl h-96">
										<p className="text-center text-gray-400 text-2xl">Oops! Something went wrong. Please try again later.</p>
									</div>
								)}
							</Card>

							<h2 className="text-center text-3xl font-semibold text-white">Explore</h2>
							<div className="flex flex-wrap justify-center gap-4 relative">
								<div className="relative group">
									<Button
										className="min-w-[180px] bg-cyan-400 text-base font-medium text-white hover:bg-cyan-500"
										size="lg"
									>
										Lip-syncing
									</Button>
									<div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity"></div>
								</div>

								<div className="relative group">
									<Button
										className="min-w-[180px] bg-cyan-400 text-base font-medium text-white hover:bg-cyan-500"
										size="lg"
									>
										Multilingual
									</Button>
									<div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity"></div>
								</div>
							</div>
						</div>

						<ShareLink />
					</div>
					<div className="flex justify-end gap-4 flex-wrap">
						<Link href="/">
							<Button
								variant="outline"
								size="lg"
								className="min-w-[140px] w-full sm:w-auto border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
							>
								<RotateCcw className="mr-2 h-4 w-4" />
								Restart
							</Button>
						</Link>
						<Button
							size="lg"
							className="min-w-[140px] w-full sm:w-auto bg-cyan-400 font-medium text-white hover:bg-cyan-500"
							onClick={handleShareClick}
						>
							<Share className="mr-2 h-4 w-4" />
							Share
						</Button>
					</div>
				</div>
				<ShareLink isOpen={isOpen} onClose={handleModalClose} movies={movies} />
			</Card>
		</div>
	);
};

export default ViewUpload;