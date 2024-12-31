import React from 'react';
import Header from '../components/layout/Header'; // Import the Header component
import Head from 'next/head';
import '../../src/styles/globals.css';
import CustomThemeProvider from '../context/ThemeProvider';
import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomThemeProvider>
        <Layout>
          <Head>
            <title>Eros Now</title>
          </Head>
          <Header />
          <Component {...pageProps} />
        </Layout>
      </CustomThemeProvider>
    </>
  );
}

export default MyApp;
