import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/cardborderxl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from '../../components/components/ui/aspect-ratio';
import InfiniteScroll from '../../components/components/ui/InfiniteScroll';

const MoviePage = ({ initialMovies, totalCount, page: initialPage }) => {
  const router = useRouter();
  const [titleFromCookie, setTitleFromCookie] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState(initialMovies);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const title = Cookie.get('title');
    setTitleFromCookie(title);
  }, []);

  // Initialize hasMore based on initialMovies and totalCount
  useEffect(() => {
    setHasMore(currentPage < Math.ceil(totalCount / 8));
  }, [totalCount, currentPage]);

  const fetchMovies = async (page, replace = false) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const axios = axiosInstance();
      const response = await axios.post(API_ENDPOINTS.GET_ALL_MOVIES_LIST, {
        page,
      });

      console.log('Fetched movies for page:', page, response?.data?.data);

      const newMovies = response?.data?.data?.data || [];
      const total = response?.data?.data?.totalCount || 0;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => replace ? newMovies : [...prev, ...newMovies]);
        setHasMore(page < Math.ceil(total / 8));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage, false);
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
    <div className="h-[835px] min-h-screen p-4 overflow-hidden">
      <div className="sticky rounded-t-xl top-0 z-10 bg-card-cardCustomBlue p-4">
        {/* Header with back button */}
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
            maxLength={50}
            className="w-full rounded-full border-none bg-blueYonder py-3 pl-12 pr-3 text-customWhite placeholder-customWhite"
          />
        </div>
      </div>
      <Card className="bg-card-cardCustomBlue p-6 h-full overflow-y-auto hide-scrollbar" ref={scrollContainerRef}>
        <div className="space-y-4">

          <div className="relative text-lg font-semibold !text-customWhite">
            Choose Movie
          </div>

          {/* Movie Cards with InfiniteScroll component */}
          {filteredFeatures.length === 0 && !loading ? (
            <div className="flex h-full items-center justify-center mt-6">
              No Movie found
            </div>
          ) : (
            <InfiniteScroll
              hasMore={hasMore}
              loadMore={loadMoreItems}
              loading={loading}
              scrollContainerRef={scrollContainerRef}
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4"
              loader={
                <div className="flex justify-center items-center py-4 col-span-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-buttonBorder"></div>
                </div>
              }
            >
              {filteredFeatures.map((feature) => (
                <div key={feature.path} className="space-y-2 text-center">
                  <Card
                    className={`bg-blue-800/20 relative mb-2 transform cursor-pointer overflow-hidden border-0 backdrop-blur-sm transition-transform duration-200 hover:scale-105 ${selectedMovie?.id === feature.id ? 'border border-solid border-buttonBorder' : ''}`}
                    aria-label={`Select ${feature.title}`}
                    onClick={() => router.push(feature.path)}
                  >
                    <CardContent className="p-0">
                      <AspectRatio ratio={16 / 9} className="w-full">
                        <Image
                          src={feature.image || '/fallback-image.jpg'}
                          alt={`${feature.title} image`}
                          width={500}
                          height={500}
                          objectFit="contain"
                          priority={feature.id < 4} // Only prioritize first 4 images
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                  <p className="text-sm font-bold text-customWhite">
                    {feature.title}
                  </p>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </Card>
    </div>
  );
};

// Server-side fetching
export async function getServerSideProps(context) {
  try {
    const axios = axiosInstance(context);
    const response = await axios.post(API_ENDPOINTS.GET_ALL_MOVIES_LIST, {
      page: 1,
    });

    return {
      props: {
        initialMovies: response?.data?.data?.data || [],
        totalCount: response?.data?.data?.totalCount || 0,
        page: 1,
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