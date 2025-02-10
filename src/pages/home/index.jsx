import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../components/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import PolygonLogo from '../../../public/assets/images/polygon.webp';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const features = [
    {
      title: 'face-swap',
      image: '/assets/images/faceswap.webp',
      description: 'Advanced face swapping technology',
      path: '/movie',
    },
    {
      title: 'lip-syncing',
      image: '/assets/images/lipsyncing.webp',
      description: 'Precise lip synchronization',
      path: '/movie',
    },
    {
      title: 'multilingual',
      image: '/assets/images/multilingual.webp',
      description: 'Support for multiple languages',
      path: '/movie',
    },
  ];

  const handleBackClick = () => {
    router.back();
  };

  const handleHomeBackClick = () => {
    router.push('https://erosnow.com/');
  };

  const handleFeatureClick = (feature) => {
    Cookies.set('title', feature?.title);
  };

  return (
    <>
      <Head>
        <title>
          Eros Now - Watch over 11,000+ HD Movies, TV Shows & Originals Online |
          Eros Now
        </title>
        <meta
          name="description"
          content="Access India's largest movie collection with Eros Now. Watch & download HD Movies, TV Shows, Eros Now Originals & Songs!"
        />
        <meta
          property="og:title"
          content="Eros Now - Watch over 11,000+ HD Movies, TV Shows & Originals Online | Eros Now"
        />
        <meta
          property="og:description"
          content="Access India's largest movie collection with Eros Now. Watch & download HD Movies, TV Shows, Eros Now Originals & Songs!"
        />
        <meta
          property="og:image"
          content="https://erosnow.com/public/images/sq-thumb-new-216_216.png"
        />
        <meta property="og:url" content="https://erosnow.com/" />
        <meta name="twitter:card" content="Summary" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div className="h-[835px] min-h-screen p-4">
        <Card className="bg-card-cardCustomBlue p-4">
          <div className="mt-2 space-y-4">
            <div className="relative flex justify-end mb-9 sm:mb-0">
              <Link href="/viewall" passHref>
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-custom-gradient hover:border border-transparent hover:border-buttonBorder cursor-pointer font-medium"
                  aria-label="My Creations"
                >
                  My Creations
                </button>
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center text-center text-customWhite h-14">
                <span className="text-base sm:text-xl md:text-2xl lg:text-4xl font-semibold text-center">
                  Bring Your Movie Vision to Life—
                  <span className="gradient_text_about-bg">Step into the Spotlight</span>
                </span>


                <img
                  src={PolygonLogo.src}
                  alt="Polygon Logo"
                  className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 object-contain"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="w-1004 text-center text-xl leading-7 text-customWhite font-medium">
                Transform iconic movie scenes with your image, adding your unique twist to unforgettable moments. Become the star you’ve always dreamed of!
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="mx-auto max-w-7xl">
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="space-y-2">
                      {feature.title === 'face-swap' ? (
                        <Link href={feature.path} passHref legacyBehavior>
                          <Card
                            className="bg-blue-800/20 mb-6 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                            aria-label={`Go to ${feature.title}`}
                            onClick={() => handleFeatureClick(feature)}
                          >
                            <CardContent className="p-0 relative">
                              <div className="relative aspect-video flex items-center justify-center">
                                <img
                                  src={feature.image}
                                  alt={`${feature.title} image`}
                                  className="object-cover h-full w-full"
                                />
                                {/* <div className="absolute  flex items-center justify-center rounded-full w-10 h-10 shadow-lg border-buttonBorder cursor-pointer bg-gradient-custom-gradient">
                                  <ArrowLeft className="rotate-180 text-blue-600 w-5 h-5" />
                                </div> */}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ) : (
                        <div className="mb-6 cursor-not-allowed">
                          <Card className="bg-blue-800/20 transform overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200">
                            <CardContent className="p-0">
                              <div className="relative aspect-video">
                                <img
                                  src={feature.image}
                                  alt={`${feature.title} image`}
                                  className="h-full w-full object-cover"
                                />
                                <div className="bg-gray-900/80 absolute inset-0 flex items-center justify-center !backdrop-blur-[2px]">
                                  <div className="text-center">
                                    <span className="text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                                      Coming Soon
                                    </span>
                                    <div className="mt-2 h-1 w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-75" />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      {feature.title === 'face-swap' ? (
                        <Link
                          href={feature.path}
                          passHref
                          legacyBehavior
                          className="transition-opacity duration-200 hover:opacity-80"
                        >
                          <div className="bg-button-gradient flex h-14 cursor-pointer items-center justify-center rounded-2xl border border-slateBlue text-center text-lg font-bold capitalize text-white transition-opacity duration-200 hover:opacity-75">
                            {feature.title}
                          </div>
                        </Link>
                      ) : (
                        <div className="bg-button-gradient flex h-14 cursor-not-allowed items-center justify-center rounded-2xl border border-slateBlue text-center text-lg font-bold capitalize text-white/50 transition-opacity duration-200 hover:opacity-75">
                          {feature.title}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
