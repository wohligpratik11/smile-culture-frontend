import { useSpinner } from '../../../context/spinnerContext';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';

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
  const { showSpinner, hideSpinner } = useSpinner();
  const [uppyInstance, setUppyInstance] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  useEffect(() => {
    const initUppy = async () => {
      const Uppy = (await import('@uppy/core')).default;
      const Webcam = (await import('@uppy/webcam')).default;
      const ImageEditor = (await import('@uppy/image-editor')).default;

      // Detect iOS device
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      // Initialize Uppy with no webcam if iOS device
      const uppy = new Uppy({
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*'],
        },
      });

      // Add webcam only if it's not iOS device
      if (!isIOS) {
        const facingMode = 'environment'; // Use environment camera for non-iOS
        uppy.use(Webcam, {
          modes: ['picture', 'video'],
          mirror: false,
          facingMode,
          showRecordingLength: true,
          preferredImageMimeType: 'image/jpeg',
          preferredVideoMimeType: 'video/mp4',
          mobileNativeCamera: false, // Disable native camera to use Uppy's implementation
        });
      }

      uppy.use(ImageEditor);

      // Request camera permissions before initializing (only for non-iOS devices)
      if (!isIOS && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true,
          });
          console.log('Camera access granted');
          setCameraError(null);
        } catch (error) {
          console.error('Camera access error:', error);
          setCameraError(error.message);

          if (error.name === 'NotAllowedError') {
            alert('Please enable camera access in your browser settings to use this feature.');
          } else if (error.name === 'NotFoundError') {
            alert('No camera device found. Please ensure your device has a working camera.');
          } else {
            alert('Camera error: ' + error.message);
          }
        }
      }

      uppy.on('startRecording', () => setIsRecording(true));
      uppy.on('stopRecording', () => setIsRecording(false));

      uppy.on('complete', async (result) => {
        const files = result.successful;
        if (files.length > 0) {
          setIsUploading(true);
          setIsRecording(false);
          if (onUploadComplete) {
            await onUploadComplete(files.map((file) => file.data));
          }
          hideSpinner();
          setIsUploading(false);
        }
      });

      setUppyInstance(uppy);
    };

    initUppy();

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

  return (
    <div className="relative">
      {uppyInstance && !cameraError ? (
        <Dashboard
          uppy={uppyInstance}
          width="100%"
          height="500px"
          showProgressDetails
          proudlyDisplayPoweredByUppy={false}
          note="Images and videos only, up to 10MB each"
        />
      ) : cameraError ? (
        <div className="w-full h-[500px] bg-deepNavy rounded-lg flex items-center justify-center flex-col gap-4">
          <div className="text-white text-center px-4">
            <p className="mb-2">Camera access is required</p>
            <p className="text-sm opacity-75">{cameraError}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="w-full h-[500px] bg-deepNavy rounded-lg flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      {isUploading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;