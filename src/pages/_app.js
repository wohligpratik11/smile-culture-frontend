import React, { useEffect } from 'react';
// import Header from '../components/layout/Header'; // Import the Header component
import Head from 'next/head';
import '../../src/styles/globals.css';
import CustomThemeProvider from '../context/ThemeProvider';
import Layout from '@/components/layout/Layout';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { useLogin } from '../../src/components/hooks/useLogin';

function MyApp({ Component, pageProps }) {
  useLogin();
  return (
    <>
      <CustomThemeProvider>
        <Layout>
          <Head>
            <title>Eros Now</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
