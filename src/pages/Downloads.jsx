import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Downloads = () => {
  const { downloadedVideos, removeDownload } = useAppContext();

  return (
    <div className="p-4 lg:p-8 max-w-[1280px] mx-auto h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-yt-gray rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Downloads</h1>
          <p className="text-yt-lightgray mt-1">{downloadedVideos.length} videos</p>
        </div>
      </div>

      {downloadedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-yt-lightgray">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <h2 className="text-xl font-medium mb-2 text-white">No downloaded videos</h2>
          <p>Videos you download will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {downloadedVideos.map((video) => (
            <div key={video.id} className="flex gap-4 group hover:bg-yt-gray/50 p-2 rounded-xl transition-colors relative">
              <Link to={`/watch/${video.id}`} className="relative w-40 sm:w-60 flex-shrink-0 aspect-video rounded-xl overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] sm:text-xs font-medium px-1 rounded">
                  {video.duration}
                </div>
              </Link>
              <div className="flex flex-col flex-1 py-1">
                <Link to={`/watch/${video.id}`}>
                  <h3 className="text-base sm:text-lg font-medium text-white line-clamp-2 leading-snug group-hover:text-blue-400">
                    {video.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-yt-lightgray mt-1">{video.channel}</p>
                <p className="text-xs sm:text-sm text-yt-lightgray">{video.views} • {video.uploadedAt}</p>
                <div className="mt-auto pt-2 hidden sm:block">
                  <span className="bg-yt-gray text-xs px-2 py-1 rounded-md text-yt-lightgray">Downloaded</span>
                </div>
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); removeDownload(video.id); }}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-[#3f3f3f] rounded-full self-start transition-all ml-auto text-yt-lightgray hover:text-white"
                title="Remove from downloads"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
