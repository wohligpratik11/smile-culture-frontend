import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../../components/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ArrowUpFromLine } from "lucide-react";
import { apiService, API_ENDPOINTS } from "../../lib/api/apiService";
import axiosInstance from "../../lib/api/axiosInstance";
import Cookie from "js-cookie";
import Image from "next/image";
import CryptoJS from "crypto-js";
import SelectImage from "../../../public/assets/images/image.webp";
import Video from "../../../public/assets/images/video.webp";
import UploadImages from "../../../public/assets/images/uploadImages.webp";
import UppyUploader from "../../components/components/ui/UppyUploader";
import SelfieInstruction from "../upload/selfieInstruction";
import { useSpinner } from "../../context/spinnerContext";
import LoadingScreen from "../../components/components/ui/loader";
import { X } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "../../components/components/ui/dialog";
import { AspectRatio } from "../../components/components/ui/aspect-ratio";
import { toast } from "react-toastify";
import { useUploadContext } from "../../context/UploadContext";
import ViewUpload from "./viewupload";
import { useToaster } from "../../components/common/toaster";

const UploadPage = ({ movies }) => {
	const router = useRouter();

	// -- States --
	const [titleFromCookie, setTitleFromCookie] = useState("");
	const [currentCharacterId, setCurrentCharacterId] = useState(null);
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [showSelfieInstructions, setShowSelfieInstructions] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

	// This will store an array of objects like:
	// [ { characterId: 123, uploadedUrl: 'https://...' }, ... ]
	const [selectedImages, setSelectedImages] = useState([]);

	const { showSpinner, hideSpinner } = useSpinner();
	const { addToast } = useToaster();

	// -- Effects --
	useEffect(() => {
		const title = Cookie.get("title");
		setTitleFromCookie(title || "");

		// Decrypt the array of selected characters, if stored.
		const encryptedData = Cookie.get("selectedCharacters");
		if (encryptedData) {
			try {
				const bytes = CryptoJS.AES.decrypt(
					encryptedData,
					"your-encryption-key"
				);
				const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
				if (decryptedData) {
					setSelectedCharacters(JSON.parse(decryptedData));
				}
			} catch (error) {
				console.error("Error decrypting selectedCharacters:", error);
			}
		}
	}, []);

	// -- Handlers --
	const handleUploadComplete = useCallback(
		async (files) => {
			if (!files || files.length === 0) {
				alert("No files selected");
				return;
			}

			try {
				const firstFile = files[0];
				// Create FormData and append the file
				const newFormData = new FormData();
				newFormData.append("user_image", firstFile);

				const axios = axiosInstance();
				const response = await axios.post(
					API_ENDPOINTS.VALIDATION_TO_IMAGE,
					newFormData
				);

				if (response.data.status_code === 200) {
					const uploadedUrl = response.data.data?.url;

					// Update the preview for the relevant character, not for all
					setSelectedImages((prevSelectedImages) => {
						// Remove any previous entry for the same character to avoid duplicates
						const updated = prevSelectedImages.filter(
							(item) => item.characterId !== currentCharacterId
						);
						updated.push({ characterId: currentCharacterId, uploadedUrl });
						return updated;
					});

					// Handle cookies - store or update
					const existingUploadedData = Cookie.get("uploadedData");
					let uploadedDataArray = existingUploadedData
						? JSON.parse(existingUploadedData)
						: [];
					uploadedDataArray.push(uploadedUrl);
					Cookie.set("uploadedData", JSON.stringify(uploadedDataArray));

					// Handle characterId cookie
					const existingCharacterIds = Cookie.get("characterId");
					let updatedCharacterIds = existingCharacterIds
						? JSON.parse(existingCharacterIds)
						: [];
					if (!updatedCharacterIds.includes(currentCharacterId)) {
						updatedCharacterIds.push(currentCharacterId);
						Cookie.set("characterId", JSON.stringify(updatedCharacterIds));
					}

					addToast({
						title: response.data.data?.final_response || "Upload successful",
						type: "success",
					});
				} else if (response.data.status_code === 400) {
					addToast({
						title: response.data.data?.final_response || "Upload failed",
						type: "error",
					});
				}
			} catch (error) {
				addToast({
					title: "Unexpected error occurred. Please try again.",
					type: "error",
				});
				console.error("Error uploading file:", error);
			} finally {
				setIsUploading(false);
			}
		},
		[currentCharacterId, addToast]
	);

	const closeSelfieInstructions = () => {
		setShowSelfieInstructions(false);
	};

	const uploadImageData = () => {
		setIsUploading(true);
	};

	const handleCharacterClick = (movie) => {
		setCurrentCharacterId(movie.character_id);
		setShowSelfieInstructions(true);
	};

	const handleNextClick = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const uploadedFileData = Cookie.get("uploadedData") || "";
		const titleFromCookie = Cookie.get("title");
		const characterIds = Cookie.get("characterId") || "";
		const selectMode = Cookie.get("mode") || "";

		const formData = new FormData();
		formData.append("feature_used", titleFromCookie);
		formData.append("mode", selectMode);

		if (characterIds) {
			formData.append("character_ids", characterIds);
		}
		if (uploadedFileData) {
			formData.append("user_images", uploadedFileData);
		}

		try {
			const axios = axiosInstance();
			// up to 1 hour
			const response = await axios.post(
				API_ENDPOINTS.CREATE_NEW_STORE_DATA,
				formData,
				{
					timeout: 3600000,
				}
			);

			if (response.data.status_code === 200) {
				setIsUploadSuccessful(true);
				addToast({
					title: "Data created successfully.",
					type: "success",
				});
				const outputVideoUrl = response.data?.data[0]?.output_video_url;
				if (outputVideoUrl) {
					const encryptedVideoUrl = CryptoJS.AES.encrypt(
						outputVideoUrl,
						"your-encryption-key"
					).toString();
					Cookie.set("output_video_url", encryptedVideoUrl);
				}
				router.push("/upload/viewupload");
			} else {
				addToast({
					title: response.data.message || "An error occurred.",
					type: "error",
				});
			}
		} catch (error) {
			addToast({
				title: "Unexpected error occurred. Please try again.",
				type: "error",
			});
			console.error("Error during API call:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Helper to format cookie title
	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie
				.replace(/-/g, " ")
				.replace(/\b\w/g, (char) => char.toUpperCase());
			return (
				<h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">
					{formattedTitle}
				</h1>
			);
		}
		return (
			<h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">
				Loading...
			</h1>
		);
	};

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Link href={router.asPath} passHref>
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

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{movies.map((movie, index) => {
							// Find if there's a preview image for this character
							const previewData = selectedImages.find(
								(item) => item.characterId === movie.character_id
							);
							return (
								<div key={index}>
									<div className="flex gap-2 flex-col sm:flex-row">
										{/* Upload Card */}
										<Card
											className={`cursor-pointer transition-all h-[122px] w-full sm:w-[172px] rounded-xl shadow
                        ${!previewData
													? "p-1 border border-slateBlue shadow"
													: ""
												}
                      `}
											onClick={() => handleCharacterClick(movie)}
										>
											<div className="flex flex-col items-center gap-2">
												{/* If a preview exists, display it; else show the default upload prompt */}
												{previewData ? (
													<Image
														src={previewData.uploadedUrl}
														alt="Uploaded Image"
														width={150}
														height={80}
														className="contain rounded-2xl border border-slateBlue shadow mt-2"
													/>
												) : (
													<div className="flex flex-col items-center gap-2 mt-2.5">
														<Image
															src={UploadImages}
															alt="Image Icon"
															className="w-10 sm:w-12 h-10 sm:h-12"
														/>
														<div className="flex items-center space-x-2">
															<ArrowUpFromLine size={20} strokeWidth={3} />
															<span className="text-white font-medium text-xs">
																{movie.title || "Upload Image"}
															</span>
														</div>
													</div>
												)}
											</div>
										</Card>

										{/* Character Card/Thumbnail */}
										<div className="flex flex-col items-center gap-2 mt-2 sm:mt-0 sm:ml-2">
											<Image
												src={movie.url || UploadImages}
												alt={movie.title || "Movie Image"}
												width={155}
												height={122}
												className="object-contain rounded-2xl"
											/>
											<span className="ml-3 text-white font-medium text-sm text-center sm:text-left">
												{movie.character_real_name ||
													"Character Name Not Available"}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Show the "SelfieInstruction" component */}
					{showSelfieInstructions && (
						<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
							<SelfieInstruction
								closeModal={closeSelfieInstructions}
								uploadImageData={uploadImageData}
							/>
						</div>
					)}

					{/* Uppy Upload Dialog */}
					{isUploading && (
						<Dialog
							open={isUploading}
							onOpenChange={() => setIsUploading(false)}
						>
							<DialogTrigger asChild></DialogTrigger>
							<DialogContent className="mx-auto max-w-4xl p-2 !bg-deepNavy rounded-lg mb-2">
								<DialogTitle className="text-xl font-medium ml-1.5 !text-customWhite">
									Upload Selfie Image
								</DialogTitle>
								<UppyUploader
									stopUploading={() => setIsUploading(false)}
									onUploadComplete={handleUploadComplete}
								/>
							</DialogContent>
						</Dialog>
					)}

					{/* If you have a loader screen when isLoading */}
					{isLoading && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<LoadingScreen />
						</div>
					)}
				</div>

				{/* Next Button */}
				<div className="flex justify-end space-x-4 mt-6">
					<Link href="/upload/viewupload" prefetch>
						<button
							className="px-4 py-2 bg-gradient-custom-gradient border border-buttonBorder rounded-lg w-52 h-12"
							disabled={isUploading || isUploadSuccessful}
							onClick={handleNextClick}
						>
							Next
						</button>
					</Link>
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
				const bytes = CryptoJS.AES.decrypt(
					cookies.selectedCharacters,
					"your-encryption-key"
				);
				const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
				if (decryptedData) {
					selectedCharacters = JSON.parse(decryptedData);
				}
			} catch (error) {
				console.error("Decryption error:", error);
			}
		}

		const payload = { character_ids: selectedCharacters };
		const axios = axiosInstance(context);
		const response = await axios.post(
			API_ENDPOINTS.GET_ALL_SELECTED_CHARACTERS_LIST,
			payload
		);

		return {
			props: {
				movies: response?.data?.data || [],
			},
		};
	} catch (error) {
		console.error("Error fetching movies:", error);
		return {
			props: {
				movies: [],
			},
		};
	}
}

export default UploadPage;
