'use client';
import { featuredMovies } from '@/data/ActionData';
import { featuredMovie } from '@/data/ActionData1';
import { categories } from '@/data/CategoriesData';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFilter, FaHeart, FaPlay, FaRegHeart, FaSearch, FaStar } from 'react-icons/fa';



export default function Home() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();


    const handleCategoryClick = (name: string) => {
        const path = name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/${path}`);
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const container = scrollContainerRef.current;
            const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
            container.scrollBy({ left: scrollLeft, behavior: 'smooth' });
        }
    };

    const filteredMovies = featuredMovie.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                </div>
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            The Last Adventure
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            An epic journey through uncharted territories where danger and discovery await at every turn.
                        </p>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg transform hover:scale-105 transition-all duration-200">
                                <FaPlay className="mr-2" />
                                Watch Now
                            </button>
                            <button
                                className="flex items-center px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg transform hover:scale-105 transition-all duration-200"
                                onClick={() => router.push('/favorithes')}
                            >
                                <FaHeart className="mr-2" />
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold mb-6 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Featured Movies
                    </h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                            />
                            <FaSearch className="absolute right-4 top-3.5 text-gray-400" />
                        </div>
                        <button className="flex items-center px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <FaFilter className="mr-2" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Movie Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-72 object-cover"
                                    />
                                    <button className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-red-600 transition-colors duration-200">
                                        {movie.isFavorite ? (
                                            <FaHeart className="text-red-500" />
                                        ) : (
                                            <FaRegHeart className="text-white" />
                                        )}
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                                        <div className="flex items-center bg-gray-700/50 px-2 py-1 rounded">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span className="text-white">{movie.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm mb-4">
                                        <span>{movie.year}</span>
                                        <span className="mx-2">•</span>
                                        <span>{movie.duration}</span>
                                        <span className="mx-2">•</span>
                                        <span>{movie.genre}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{movie.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <FaSearch className="w-8 h-8 text-white/20" />
                            </div>
                            <p className="text-xl text-white/40 font-medium">No movies found matching your search.</p>
                        </div>
                    )}
                </div>


                {/* All Movies */}
                <h2 className="text-3xl font-bold mb-6 md:m-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    All Movies
                </h2>

                {/* Horizontal scrolling movie list */}
                <div className="relative overflow-hidden">
                    {/* Previous button */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-r-lg transition-all duration-200 backdrop-blur-sm"
                    >
                        <FaChevronLeft size={24} />
                    </button>

                    {/* Next button */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-l-lg transition-all duration-200 backdrop-blur-sm"
                    >
                        <FaChevronRight size={24} />
                    </button>
                    <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-6 pb-8 auto-scroll">
                            {featuredMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="flex-none w-[300px] group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="relative">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-72 object-cover"
                                        />
                                        <button className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-red-600 transition-colors duration-200">
                                            {movie.isFavorite ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart className="text-white" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-semibold">{movie.title}</h3>
                                            <div className="flex items-center bg-gray-700/50 px-2 py-1 rounded">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                <span>{movie.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <span>{movie.year}</span>
                                            <span className="mx-2">•</span>
                                            <span>{movie.duration}</span>
                                            <span className="mx-2">•</span>
                                            <span>{movie.genre}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{movie.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Categories Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                onClick={() => { handleCategoryClick(category.name) }}
                                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/30 cursor-pointer transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{category.name}</span>
                                    <span className="text-gray-400">{category.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}