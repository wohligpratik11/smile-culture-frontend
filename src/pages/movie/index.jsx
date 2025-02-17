import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import Pagination from '../../components/components/ui/pagination';

const MoviePage = ({ initialMovies, totalCount, page: initialPage }) => {
  const router = useRouter();
  const [titleFromCookie, setTitleFromCookie] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));

  useEffect(() => {
    const title = Cookie.get('title');
    setTitleFromCookie(title);
  }, []);

  // Re-fetch movies whenever the page changes
  useEffect(() => {
    const { page } = router.query;
    if (page && parseInt(page) !== currentPage) {
      handlePageChange(parseInt(page));
    }
  }, [router.query.page]);

  // Fetch new movies when page changes
  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );

    setCurrentPage(page);

    try {
      const axios = axiosInstance();
      const response = await axios.post(API_ENDPOINTS.GET_ALL_MOVIES_LIST, {
        page,
      });

      setMovies(response?.data?.data?.data || []);
      setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8)); // Recalculate total pages
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const features = movies?.map((movie) => ({
    id: movie.movie_id,
    title: movie.movie_name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    name: movie.movie_name,
    image: movie.compressed_thumbnail_url,
    path: `/scenes/${movie.movie_id}`,
  }));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFeatures = features.filter((feature) =>
    feature?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const handleMovieSelect = (movie) => {
    setSelectedMovie((prev) => (prev?.id === movie.id ? null : movie));
  };

  const renderHeader = () => {
    if (titleFromCookie) {
      const formattedTitle = titleFromCookie
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return (
        <h1 className="mb-4 text-2xl font-medium capitalize leading-10 text-customWhite">
          {formattedTitle}
        </h1>
      );
    }
    return (
      <h1 className="mb-4 text-2xl font-medium capitalize leading-10 text-customWhite">
        Loading...
      </h1>
    );
  };

  return (
    <div className="h-[835px] min-h-screen p-4">
      <Card className="bg-card-cardCustomBlue p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button
                className="bg-gradient-custom-gradient rounded-lg hover:border hover:border-buttonBorder px-4 py-2"
                aria-label="Go Back"
              >
                <ArrowLeft />
              </button>
            </Link>

            <div className="mt-4 text-lg font-medium leading-10">
              {renderHeader()}
            </div>
          </div>

          <div className="relative mt-4">
            <CiSearch className="absolute left-4 top-1/2 h-full w-6 -translate-y-1/2 transform font-bold text-customWhite" />
            <Input
              type="text"
              placeholder="Search for Movies"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-full border-none bg-blueYonder py-3 pl-12 pr-3 text-customWhite placeholder-customWhite"
            />
          </div>
          <div className="relative text-lg font-semibold !text-customWhite">
            Choose Movie
          </div>

          <div
            className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-1 gap-6 sm:grid-cols-4' : ''}`}
          >
            {filteredFeatures.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                No Movie found
              </div>
            ) : (
              filteredFeatures.map((feature) => (
                <div key={feature.path} className="space-y-2 text-center">
                  <Card
                    className={`bg-blue-800/20 relative mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ${selectedMovie?.id === feature.id ? 'border border-solid border-buttonBorder' : ''}`}
                    aria-label={`Select ${feature.title}`}
                    onClick={() => router.push(feature.path)}                  >
                    <CardContent className="p-0">
                      <AspectRatio ratio={16 / 9} className="w-full">
                        <Image
                          src={feature.image || '/fallback-image.jpg'}
                          alt={`${feature.title} image`}
                          objectFit="contain"
                          width={500}
                          height={500}
                          quality={100}
                          priority={true}
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                  <p className="text-sm font-bold text-customWhite">
                    {feature.title}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between sm:flex-row">
          <div
            className={`flex items-center justify-center space-x-2 sm:flex-1 ${selectedMovie ? 'md:ml-36' : ''} flex-wrap sm:space-x-2`}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          {/* {selectedMovie && (
            <button
              className="bg-gradient-custom-gradient mt-4 h-12 w-52 rounded-lg hover:border hover:border-buttonBorder px-4 py-2 sm:ml-4 sm:mt-0"
              onClick={() => router.push(selectedMovie.path)}
            >
              Next
            </button>
          )} */}
        </div>


      </Card>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const page = query.page || 1;

  try {
    const axios = axiosInstance(context);
    const response = await axios.post(API_ENDPOINTS.GET_ALL_MOVIES_LIST, {
      page,
    });

    return {
      props: {
        initialMovies: response?.data?.data?.data || [],
        totalCount: response?.data?.data?.totalCount || 0,
        page: parseInt(page, 10),
      },
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: {
        initialMovies: [],
        totalCount: 0,
        page: 1,
      },
    };
  }
}

export default MoviePage;
