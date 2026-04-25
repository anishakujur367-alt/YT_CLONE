import { useSearchParams } from 'react-router-dom';
import { videos } from '../data/videos';
import VideoCard from '../components/VideoCard';
import { useState } from 'react';

const categories = [
  "All", "Gaming", "Coding", "Music", "Live", "Mixes", 
  "Tech", "Vlog", "Science", "Education", "News", "Podcasts"
];

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [activeCategory, setActiveCategory] = useState('All');

  let filteredVideos = videos;

  if (searchQuery) {
    filteredVideos = videos.filter(v => 
      v.title.toLowerCase().includes(searchQuery) || 
      v.channel.toLowerCase().includes(searchQuery)
    );
  } else if (activeCategory !== 'All') {
    filteredVideos = videos.filter(v => v.category === activeCategory);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs */}
      <div className="sticky top-0 bg-yt-black/95 backdrop-blur-sm z-10 py-3 px-4 flex items-center gap-3 overflow-x-auto hide-scrollbar border-b border-yt-gray min-h-[56px]">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors h-8 flex items-center justify-center ${
              activeCategory === category 
                ? 'bg-white text-black' 
                : 'bg-yt-gray text-white hover:bg-[#3f3f3f]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {filteredVideos.length > 0 ? (
        filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
    ))
        ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-yt-lightgray">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p>Try different keywords or remove search filters</p>
        </div>
        )}
    </div>
    </div>
);
};

export default Home;