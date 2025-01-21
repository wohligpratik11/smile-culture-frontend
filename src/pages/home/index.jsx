import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../components/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const features = [
    {
      title: 'face-Swap',
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

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div className="h-[835px] min-h-screen p-6">
        <Card className="bg-card-cardCustomBlue p-6">
          <div className="mt-4 space-y-4">
            {/* <div className="relative">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
							onClick={handleHomeBackClick}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
					</div> */}
            <div className="flex justify-center space-x-4">
              <div className="w-913 text-center text-4xl font-semibold text-customWhite">
                Live Your Movie Dream—Step Into the Spotlight!
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="w-1004 text-center text-xl leading-7 text-customWhite">
                Transform iconic movie scenes with your image and become the
                star you’ve always dreamed of. Add your personal touch to the
                dialogue and create unforgettable moments!
              </div>
            </div>
            {/* <div className="mt-6 flex justify-center space-x-4">
              <button className="bg-gradient-custom-gradient h-12 w-52 rounded-lg border border-buttonBorder px-4 py-2">
                Get Started
              </button>
            </div> */}
            <div className="flex items-center justify-center mt-4">
              <div className="mx-auto max-w-7xl">
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.title} className="space-y-2">
                      <Link href={feature.path} passHref legacyBehavior>
                        <Card
                          className="mb-6 transform cursor-pointer overflow-hidden border-0 bg-blue-800/20 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                          aria-label={`Go to ${feature.title}`}
                          onClick={() => handleFeatureClick(feature)}
                        >
                          <CardContent className="p-0">
                            <div className="relative aspect-video">
                              <img
                                src={feature.image}
                                alt={`${feature.title} image`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                      <Link href={feature.path} passHref legacyBehavior>
                        <div
                          className="flex h-14 cursor-pointer items-center justify-center rounded-2xl border border-slateBlue text-center text-lg font-medium capitalize text-white"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(49, 58, 91, 0) -1.11%, rgba(49, 58, 91, 0.44) 23.83%, #313A5B 99.56%)',
                          }}
                        >
                          {feature.title}
                        </div>
                      </Link>
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
