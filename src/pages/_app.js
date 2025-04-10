import React, { useEffect } from 'react';
// import Header from '../components/layout/Header';
import Head from 'next/head';
import '../styles/globals.css';
import CustomThemeProvider from '../context/ThemeProvider';
import Layout from '@/components/layout/Layout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'; // Import useRouter
import { UploadProvider } from '../context/UploadContext';
import { AuthProvider } from '../context/AuthContext';
import { ToasterProvider } from '../components/common/toaster';
import { SpinnerProvider } from '../context/spinnerContext';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // useEffect(() => {
  //   if (router.pathname !== '/upload') {
  //     Cookies.remove('selectedCharacters');
  //   }
  // }, [router.pathname]);

  useEffect(() => {
    if (router.pathname === '/') {
      Cookies.remove('output_video_url');
      Cookies.remove('characterId');
      Cookies.remove('mode');
      Cookies.remove('selectedCharacters');
      Cookies.remove('uploadedData');
      Cookies.remove('title');
    }
  }, [router.pathname]);
  return (
    <>
      <CustomThemeProvider>
        <AuthProvider>
          <UploadProvider>
            <SpinnerProvider>
              <ToasterProvider>
                <Layout>
                  <Head>
                    <title>Smile Culture</title>
                  </Head>
                  <Component {...pageProps} />
                </Layout>
              </ToasterProvider>
            </SpinnerProvider>
          </UploadProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
