import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import styles directly (these will be included in SSR)
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/image-editor/dist/style.css';

// Dynamically import Dashboard component with no SSR
const Dashboard = dynamic(
  () => import('@uppy/react').then((mod) => mod.Dashboard),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading uploader...</div>
      </div>
    ),
  }
);

const MediaUploader = () => {
  const [isClient, setIsClient] = useState(false);
  const [uppyInstance, setUppyInstance] = useState(null);
  console.log("Uploading", uppyInstance)
  useEffect(() => {
    const initUppy = async () => {
      const Uppy = (await import('@uppy/core')).default;
      const Webcam = (await import('@uppy/webcam')).default;
      const ImageEditor = (await import('@uppy/image-editor')).default;

      const uppy = new Uppy({
        id: 'uppy-media',
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*'],
        },
      })
        .use(Webcam, {
          mirror: true,
          showRecordingLength: true,
          modes: ['picture', 'video'],
        })
        .use(ImageEditor, {
          quality: 0.8,
        });

      uppy.on('complete', (result) => {
        const files = result.successful;
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file.data);
        });

        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Upload successful:', data);
          })
          .catch((error) => {
            console.error('Upload failed:', error);
          });
      });

      setUppyInstance(uppy);
    };

    setIsClient(true);
    initUppy();

    return () => {
      // Correct cleanup method
      uppyInstance?.destroy();
    };
  }, []);


  return (
    <div>
      {isClient && uppyInstance ? (
        <div className="relative bg-deepNavy" >
          <Dashboard
            uppy={uppyInstance}
            plugins={['Webcam']}
            width="100%"
            height="500px"
            showProgressDetails
            proudlyDisplayPoweredByUppy={false}
            note="Images and videos only, up to 10 files, max 10MB each"
          />
        </div>
      ) : (
        <div className="w-full h-[400px] bg-deepNavy rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Initializing uploader...</div>
        </div>
      )}
    </div>

  );
};

export default MediaUploader;


