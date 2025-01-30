import { useSpinner } from '../../../context/spinnerContext'; // Import the useSpinner hook
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import ErosNow from "../../../../public/assets/images/erosnow.webp";
const Dashboard = dynamic(
  () => import('@uppy/react').then((mod) => mod.Dashboard),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-deepNavy rounded-lg flex items-center justify-center">
        <div className="text-white">Loading uploader...</div>
      </div>
    ),
  }
);

const MediaUploader = ({ onUploadComplete }) => {
  const { showSpinner, hideSpinner } = useSpinner(); // Use the spinner hook here
  const [uppyInstance, setUppyInstance] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const initUppy = async () => {
      const Uppy = (await import('@uppy/core')).default;
      const Webcam = (await import('@uppy/webcam')).default;
      const ImageEditor = (await import('@uppy/image-editor')).default;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const facingMode = isMobile ? 'user' : 'environment';

      const uppy = new Uppy({
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000, // 10MB limit
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*'],
        },
      })
        .use(Webcam, {
          modes: ['picture', 'video'],
          facingMode
        })
        .use(ImageEditor);

      uppy.on('complete', async (result) => {
        const files = result.successful;

        if (files.length > 0) {
          const uploadedFiles = files.map(file => file.data);

          setIsUploading(true);

          if (onUploadComplete) {
            await onUploadComplete(uploadedFiles);
          }

          hideSpinner();
          setIsUploading(false);
        }
      });

      setUppyInstance(uppy);
    };

    initUppy();

    // Cleanup function
    return () => {
      if (uppyInstance) {
        try {
          uppyInstance.close({ reason: 'unmount' });
        } catch (error) {
          console.warn('Error closing Uppy instance:', error);
        }
      }
    };
  }, [onUploadComplete, showSpinner, hideSpinner]);
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('Camera is supported!');
  } else {
    console.log('Camera is not supported on this device.');
  }

  return (
    <div className="relative">
      {uppyInstance ? (
        <Dashboard
          uppy={uppyInstance}
          width="100%"
          height="500px"
          showProgressDetails
          proudlyDisplayPoweredByUppy={false}
          note="Images and videos only, up to 10MB each"
        />
      ) : (
        <div
          className=" fixed inset-0 z-50 flex items-center justify-center "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="loader"></div>
        </div>
      )}

      {isUploading && (
        <div
          className=" fixed inset-0 z-50 flex items-center justify-center "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="loader"></div>
        </div>
      )}

    </div>
  );
};

export default MediaUploader;