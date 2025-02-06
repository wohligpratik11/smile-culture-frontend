import { useSpinner } from '../../../context/spinnerContext';
import { useState, useEffect, useRef } from 'react';
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
  const mediaStreamRef = useRef(null);

  // Enhanced stopMediaStream function to handle both video and audio tracks
  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach(track => {
        track.stop();
        track.enabled = false;
      });
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    const initUppy = async () => {
      const Uppy = (await import('@uppy/core')).default;
      const Webcam = (await import('@uppy/webcam')).default;
      const ImageEditor = (await import('@uppy/image-editor')).default;

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const facingMode = isIOS ? { exact: 'user' } : 'environment';

      const uppy = new Uppy({
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*'],
        },
      })
        .use(Webcam, {
          modes: ['picture', 'video'],
          mirror: isIOS,
          facingMode,
          showRecordingLength: true,
          preferredImageMimeType: 'image/jpeg',
          preferredVideoMimeType: 'video/mp4',
          mobileNativeCamera: false,
          onBeforeSnapshot: () => Promise.resolve(),
          onAfterSnapshot: () => {
            stopMediaStream();
          }
        })
        // .use(ImageEditor, {
        //   quality: 0.8,
        //   cropper: true,
        //   showControls: true,
        //   showSaveButton: true,
        // });
        

      // Request camera permissions
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: true
          });
          mediaStreamRef.current = stream;
          setCameraError(null);
        } catch (error) {
          console.error('Camera/audio access error:', error);
          setCameraError(error.message);
          stopMediaStream();

          if (error.name === 'NotAllowedError') {

          } else if (error.name === 'NotFoundError') {

          } else {
            alert('Camera error: ' + error.message);
          }
        }
      }

      // Event handlers for proper cleanup
      uppy.on('dashboard:modal-closed', () => {
        stopMediaStream();
      });

      uppy.on('webcam:stop', () => {
        stopMediaStream();
      });

      uppy.on('startRecording', () => {
        setIsRecording(true);
      });

      uppy.on('stopRecording', () => {
        setIsRecording(false);
        stopMediaStream();
      });

      uppy.on('complete', async (result) => {
        const files = result.successful;
        if (files.length > 0) {
          setIsUploading(true);
          setIsRecording(false);
          stopMediaStream();
          if (onUploadComplete) {
            await onUploadComplete(files.map(file => file.data));
          }
          hideSpinner();
          setIsUploading(false);
        }
      });
      uppy.on('cancel-all', () => {
        console.log('Upload cancelled');
        stopMediaStream();
      });

      uppy.on('dashboard:closed', () => {
        console.log('Dashboard closed');
        stopMediaStream();
      });

      setUppyInstance(uppy);
    };

    initUppy();

    // Cleanup function
    return () => {
      stopMediaStream();
      if (uppyInstance) {
        try {
          uppyInstance.close({ reason: 'unmount' });
          console.log('Uppy instance closed and cleanup completed');
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