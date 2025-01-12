import React, { useEffect, useState } from 'react';
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
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading uploader...</div>
      </div>
    ),
  }
);

const MediaUploader = ({ onUploadComplete }) => {
  const [uppyInstance, setUppyInstance] = useState(null);

  useEffect(() => {
    const initUppy = async () => {
      const Uppy = (await import('@uppy/core')).default;
      const Webcam = (await import('@uppy/webcam')).default;
      const ImageEditor = (await import('@uppy/image-editor')).default;

      const uppy = new Uppy({
        autoProceed: false,
        restrictions: {
          maxFileSize: 10000000, // 10MB limit
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*'],
        },
      })
        .use(Webcam, { modes: ['picture', 'video'] })
        .use(ImageEditor);


      uppy.on('complete', (result) => {
        const files = result.successful;

        if (files.length > 0) {
          // Instead of creating FormData here, just pass the file data
          const uploadedFiles = files.map(file => file.data);

          if (onUploadComplete) {
            onUploadComplete(uploadedFiles);
          }
        }
      });

      setUppyInstance(uppy);
    };

    initUppy();

    return () => {
      uppyInstance?.close();
    };
  }, [onUploadComplete]);

  return (
    <div>
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
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Initializing uploader...</div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;


