import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback here
import { Card } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import SelectImage from "../../../public/assets/images/image.webp";
import Video from "../../../public/assets/images/video.webp";
import UploadImages from "../../../public/assets/images/uploadImages.webp";
import UppyUploader from '../../components/components/ui/UppyUploader';
import SelfieInstruction from '../upload/selfieInstruction';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog';
import { AspectRatio } from "../../components/components/ui/aspect-ratio"
import { toast } from 'react-toastify';
import { useUploadContext } from '../../context/UploadContext';
import ViewUpload from './viewupload'
const UploadPage = ({ characters, movies }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [characterId, setArrayCharacterId] = useState([]);
	console.log(":characterId", characterId)

	const [selectedCharacters, setSelectedCharacters] = useState([]);
	console.log(":selectedCharacters", selectedCharacters)

	const [selectedMode, setSelectedMode] = useState(null);
	const [showSelfieInstructions, setShowSelfieInstructions] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [filePreview, setFilePreview] = useState(null);
	const [uploadedData, setUploadedData] = useState(null);
	const [selectedImages, setSelectedImages] = useState([]);
	console.log(":11212313131313", selectedImages)
	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
		const encryptedData = Cookie.get('selectedCharacters');
		if (encryptedData) {
			const bytes = CryptoJS.AES.decrypt(encryptedData, 'your-encryption-key');
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
			if (decryptedData) {
				setSelectedCharacters(JSON.parse(decryptedData));
			}
		}
	}, []);
	;

	useEffect(() => {
		if (uploadedData) {
			console.log('Uploaded Data:', uploadedData);
		}
	}, [uploadedData]);
	const handleUploadComplete = useCallback(async (files) => {
		console.log("Files received:", files);
		if (!files || files.length === 0) {
			alert('No files selected');
			return;
		}

		try {
			const firstFile = files[0];
			const previewUrl = URL.createObjectURL(firstFile);

			const newFormData = new FormData();
			newFormData.append('user_image', firstFile);

			const axios = axiosInstance();
			const response = await axios.post(API_ENDPOINTS.VALIDATION_TO_IMAGE, newFormData);

			if (response.status === 200) {
				const uploadedUrl = response?.data?.data?.url;
				setFilePreview(uploadedUrl);

				setSelectedImages(prevSelectedImages => [
					...prevSelectedImages,
					{ characterId, uploadedUrl }
				]);

				// Update the cookie with uploaded data
				const existingUploadedData = Cookie.get('uploadedData');
				let uploadedDataArray = existingUploadedData ? JSON.parse(existingUploadedData) : [];
				uploadedDataArray.push(uploadedUrl);
				Cookie.set('uploadedData', JSON.stringify(uploadedDataArray));

				// Add the current characterId to the array and update the cookie
				const existingCharacterIds = Cookie.get('characterId');
				let updatedCharacterIds = existingCharacterIds ? JSON.parse(existingCharacterIds) : [];

				// Ensure characterId is unique and append if not already present
				if (!updatedCharacterIds.includes(characterId)) {
					updatedCharacterIds.push(characterId);
					Cookie.set('characterId', JSON.stringify(updatedCharacterIds));
				}

				toast.success(response?.data?.data?.final_response);
			} else {
				console.error('Error:', response.status, response.data);
				alert('Error uploading file. Status code: ' + response.status);
			}
		} catch (error) {
			toast.error('Upload failed!');
			console.error('Error uploading file:', error);
			alert('Error uploading file. Please try again.');
		}
	}, [characterId]);  // Add characterId to dependencies











	const closeSelfieInstructions = () => {
		setShowSelfieInstructions(false);
	};
	const uploadImageData = () => {
		setIsUploading(true);
	};
	const stopUploading = () => {
		setIsUploading(false);
	};
	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

	const handleModeSelect = (mode) => {
		setSelectedMode(mode);
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
					<h2 className="text-white mb-4 font-medium text-lg">Upload Selfie</h2>
					<div className="grid grid-cols-4 gap-4">
						{movies.map((movie, index) => (
						<div>Character Name:<span className="ml-3 text-white font-medium text-sm">
								{movie.character_real_name || "Character Name Not Available"}
							</span>
								<div key={index} className="flex gap-2 mt-2">

									<Card
										className={`cursor-pointer transition-all h-[122px] w-full sm:w-[172px] rounded-xl ${filePreview ? 'p-1' : 'p-4 sm:p-4'
											}`}
										onClick={() => {
											setShowSelfieInstructions(true);
											setArrayCharacterId(movie.character_id);
										}}

									>
										<div className="flex flex-col items-center gap-2">
											{filePreview && (
												<div >
													<Image
														src={filePreview}
														alt="Selected File"
														width={70}
														height={70}
														className="rounded-lg"
													/>
												</div>
											)}
											{!filePreview && (
												<Image
													src={UploadImages}
													alt="Image Icon"
													className="w-10 sm:w-12 h-10 sm:h-12"
												/>
											)}

											<div className="flex items-center space-x-2">
												<ArrowUpFromLine size={20} strokeWidth={3} absoluteStrokeWidth />
												<span className="text-white font-medium text-xs">{movie.title || 'Upload Image'}</span>
											</div>
										</div>
									</Card>


									<div className="flex flex-col items-center gap-2 ">
										<Image
											src={movie.url || UploadImages}
											alt={movie.title || 'Movie Image'}
											width={172}
											height={122}
											className="object-contain rounded-2xl"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					{showSelfieInstructions && (
						<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
							<SelfieInstruction closeModal={closeSelfieInstructions} uploadImageData={uploadImageData} />
						</div>
					)}
					{isUploading && (
						<Dialog open={isUploading} onOpenChange={stopUploading}>
							<DialogTrigger asChild>
							</DialogTrigger>
							<DialogContent className="mx-auto max-w-4xl p-2 !bg-deepNavy rounded-lg mb-2">
								<DialogTitle className="text-xl font-medium ml-1.5">Upload Selfie Image</DialogTitle>
								<UppyUploader stopUploading={stopUploading} onUploadComplete={handleUploadComplete} />
							</DialogContent>
						</Dialog>
					)}
				</div>
				<div className="flex justify-end space-x-4 mt-6">
					<button
						className="px-4 py-2 bg-gradient-custom-gradient border border-buttonBorder rounded-lg w-52 h-12"
						onClick={() => {
							router.push('/upload/viewupload');

						}}
					>
						Next
					</button>
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	try {
		const { req } = context;
		const cookies = req.cookies;
		let selectedCharacters = [];

		if (cookies.selectedCharacters) {
			try {
				const bytes = CryptoJS.AES.decrypt(cookies.selectedCharacters, 'your-encryption-key');
				const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

				if (decryptedData) {
					selectedCharacters = JSON.parse(decryptedData);
					console.log('Parsed Selected Characters:', selectedCharacters);
				}
			} catch (error) {
				console.error('Decryption error:', error);
			}
		} else {
			console.log('selectedCharacters cookie is missing or empty');
		}

		const payload = {
			character_ids: selectedCharacters,
		};
		// Send the payload to the API
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_ALL_SELECTED_CHARACTERS_LIST, payload);

		console.log('API Response:', response?.data?.data);

		return {
			props: {
				movies: response?.data?.data || [],
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




export default UploadPage;

