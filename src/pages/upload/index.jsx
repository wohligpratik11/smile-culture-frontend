import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import SelectImage from '../../../public/assets/images/image.webp';
import Video from '../../../public/assets/images/video.webp';
import UploadImages from '../../../public/assets/images/uploadImages.webp';
import UppyUploader from '../../components/components/ui/UppyUploader';
import SelfieInstruction from '../upload/selfieInstruction';
import { useSpinner } from '../../context/spinnerContext';
import LoadingScreen from '../../components/components/ui/loader';
import { X } from 'lucide-react';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../../components/components/ui/dialog';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import { toast } from 'react-toastify';
import { useUploadContext } from '../../context/UploadContext';
import ViewUpload from './viewupload';
import { useToaster } from '../../components/common/toaster';

const UploadPage = ({ movies }) => {
  const router = useRouter();

  // -- States --
  const [titleFromCookie, setTitleFromCookie] = useState('');
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
    const title = Cookie.get('title');
    setTitleFromCookie(title || '');

    // Decrypt the array of selected characters, if stored.
    const encryptedData = Cookie.get('selectedCharacters');
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          encryptedData,
          'your-encryption-key'
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedData) {
          setSelectedCharacters(JSON.parse(decryptedData));
        }
      } catch (error) {
        console.error('Error decrypting selectedCharacters:', error);
      }
    }
  }, []);

  // -- Handlers --
  const handleUploadComplete = useCallback(
    async (files) => {
      if (!files || files.length === 0) {
        alert('No files selected');
        return;
      }

      try {
        const firstFile = files[0];
        // Create FormData and append the file
        const newFormData = new FormData();
        newFormData.append('user_image', firstFile);

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
          const existingUploadedData = Cookie.get('uploadedData');
          let uploadedDataArray = existingUploadedData
            ? JSON.parse(existingUploadedData)
            : [];
          uploadedDataArray.push(uploadedUrl);
          Cookie.set('uploadedData', JSON.stringify(uploadedDataArray));

          // Handle characterId cookie
          const existingCharacterIds = Cookie.get('characterId');
          let updatedCharacterIds = existingCharacterIds
            ? JSON.parse(existingCharacterIds)
            : [];
          if (!updatedCharacterIds.includes(currentCharacterId)) {
            updatedCharacterIds.push(currentCharacterId);
            Cookie.set('characterId', JSON.stringify(updatedCharacterIds));
          }

          addToast({
            title: response.data.data?.final_response || 'Upload successful',
            type: 'success',
          });
        } else if (response.data.status_code === 400) {
          addToast({
            title: response.data.data?.final_response || 'Upload failed',
            type: 'error',
          });
        }
      } catch (error) {
        addToast({
          title: 'Unexpected error occurred. Please try again.',
          type: 'error',
        });
        console.error('Error uploading file:', error);
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
  const isAllImagesUploaded = movies.every((movie) =>
    selectedImages.some((image) => image.characterId === movie.character_id)
  );
  const handleNextClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const uploadedFileData = Cookie.get('uploadedData') || '';
    const titleFromCookie = Cookie.get('title');
    const characterIds = Cookie.get('characterId') || '';
    const selectMode = Cookie.get('mode') || '';

    const formData = new FormData();
    formData.append('feature_used', titleFromCookie);
    formData.append('mode', selectMode);

    if (characterIds) {
      formData.append('character_ids', characterIds);
    }
    if (uploadedFileData) {
      formData.append('user_images', uploadedFileData);
    }

    try {
      const axios = axiosInstance();
      const response = await axios.post(
        API_ENDPOINTS.CREATE_NEW_STORE_DATA,
        formData,
      );

      if (response.data.status_code === 200) {
        setIsUploadSuccessful(true);
        addToast({
          title: response.data.data?.msg || 'Upload successful',
          type: 'success',
        });
        const outputVideoUrl = response.data?.data[0]?.output_video_url;
        if (outputVideoUrl) {
          const encryptedVideoUrl = CryptoJS.AES.encrypt(
            outputVideoUrl,
            'your-encryption-key'
          ).toString();
          Cookie.set('output_video_url', encryptedVideoUrl);
        }
        router.push('/upload/viewupload');
      } else {
        addToast({
          title: response.data.message || 'An error occurred.',
          type: 'error',
        });
      }
    } catch (error) {
      addToast({
        title: 'Unexpected error occurred. Please try again.',
        type: 'error',
      });
      console.error('Error during API call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format cookie title
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
    <div className="h-[835px] min-h-auto p-4">
      <Card className="bg-card-cardCustomBlue p-4 ">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Link href={router.asPath} passHref>
              <button
                className="bg-gradient-custom-gradient rounded-lg hover:border hover:border-buttonBorder px-4 py-2"
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

          <h2 className="mb-2 text-lg font-medium text-white">Upload Selfie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-1 full-hd:grid-cols-3">
            {movies.map((movie, index) => {
              const previewData = selectedImages.find(
                (item) => item.characterId === movie.character_id
              );
              return (
                <div key={index} className="flex flex-col sm:flex-row md:flex-row tablet:mb-10">
                  <div className="mt-2 flex flex-col items-center gap-2 sm:ml-4 sm:mt-0 rounded-2xl max-w-[300px]">
                    <Image
                      src={movie.url || UploadImages}
                      alt={movie.title || 'Movie Image'}
                      width={300}
                      height={300}
                      className="h-full w-full rounded-2xl object-contain transition-transform transform hover:scale-105 hover:shadow-lg"
                    />
                    <div className="w-full px-2">
                      <span className="block text-center text-base font-medium text-white break-words">
                        {movie.character_real_name || 'Character Name Not Available'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 mx-4 p-1 py-4">
                    <div className="flex justify-center items-center p-1 rounded-full border border-buttonBorder w-10 h-10 bg-gradient-custom-gradient">
                      <FaArrowUp className="text-white sm:block tablet:hidden lg:hidden" size={16} />
                      <FaArrowLeft className="text-white sm-max:hidden" size={16} />
                    </div>
                  </div>

                  <Card
                    className={`${!previewData ? 'border border-customWhite border-dashed p-1 shadow' : ''}`}
                    onClick={() => handleCharacterClick(movie)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {previewData ? (
                        <div className="relative">
                          <button
                            className="absolute right-0 top-[10px] rounded-full bg-gray-800 bg-opacity-50 p-1 text-white"
                            onClick={() => {
                              setSelectedImages((prevSelectedImages) =>
                                prevSelectedImages.filter(
                                  (item) => item.characterId !== movie.character_id
                                )
                              );
                            }}
                            aria-label="Remove Image"
                          >
                            <X size={16} className="text-white" />
                          </button>
                          <div className="h-48 w-48">
                            <Image
                              src={previewData.uploadedUrl}
                              alt="Uploaded Image"
                              width={200}
                              height={200}
                              className="h-full w-full rounded-2xl border border-slateBlue object-fill shadow"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-48 w-48 flex-col items-center justify-center gap-2">
                          <Image
                            src={UploadImages}
                            alt="Image Icon"
                            width={64}
                            height={64}
                            className="h-16 w-16"
                          />
                          <div className="flex items-center space-x-2">
                            <ArrowUpFromLine size={24} strokeWidth={3} />
                            <span className="text-sm font-medium text-white">
                              {movie.title || 'Upload Image'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>


          {/* Show the "SelfieInstruction" component */}
          {showSelfieInstructions && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
              <SelfieInstruction
                closeModal={closeSelfieInstructions}
                uploadImageData={uploadImageData}
              />
            </div>
          )}

          {/* Uppy Upload Dialog */}
          {isUploading && (
            <Dialog open={isUploading} onOpenChange={() => setIsUploading(false)}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="mx-auto mb-2 max-w-4xl rounded-lg !bg-deepNavy p-2">
                <DialogTitle className="ml-1.5 text-xl font-medium !text-customWhite">
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
            <div >
              <LoadingScreen />
            </div>
          )}
          {/* <LoadingScreen /> */}
        </div>

        {/* Next Button */}
        {isAllImagesUploaded && (
          <div className="mt-6 flex justify-end space-x-4">
            <Link href="/upload/viewupload" prefetch>
              <button
                className="bg-gradient-custom-gradient h-12 w-52 rounded-lg border border-buttonBorder px-4 py-2"
                onClick={handleNextClick}
              >
                Next
              </button>
            </Link>
          </div>
        )}
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
          'your-encryption-key'
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedData) {
          selectedCharacters = JSON.parse(decryptedData);
        }
      } catch (error) {
        console.error('Decryption error:', error);
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
    console.error('Error fetching movies:', error);
    return {
      props: {
        movies: [],
      },
    };
  }
}

export default UploadPage;


