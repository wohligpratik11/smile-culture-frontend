import React, { useEffect } from 'react';
// import Header from '../components/layout/Header';
import Head from 'next/head';
import '../../src/styles/globals.css';
import CustomThemeProvider from '../context/ThemeProvider';
import Layout from '@/components/layout/Layout';
import Cookies from 'js-cookie';
import { useLogin } from '../../src/components/hooks/useLogin';
import { useRouter } from 'next/router'; // Import useRouter
import { UploadProvider } from '../context/UploadContext';
import { AuthProvider } from '../context/AuthContext';
import { ToasterProvider } from '../components/common/toaster';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useLogin();
  // useEffect(() => {
  //   if (router.pathname !== '/upload') {
  //     Cookies.remove('selectedCharacters');
  //   }
  // }, [router.pathname]);

  useEffect(() => {
    if (router.pathname === '/') {
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
            <ToasterProvider>
              <Layout>
                <Head>
                  <title>Eros Now</title>
                </Head>
                <Component {...pageProps} />
              </Layout>
            </ToasterProvider>
          </UploadProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
