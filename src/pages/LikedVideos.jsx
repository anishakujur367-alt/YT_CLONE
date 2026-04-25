import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ThumbsUp, Trash2, X } from 'lucide-react';

const LikedVideos = () => {
  const { likedVideos, toggleLike, clearLiked } = useAppContext();

  const shorts = likedVideos.filter((v) => v.type === 'short');
  const videos = likedVideos.filter((v) => v.type !== 'short');
  const totalCount = likedVideos.length;

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">

    
      <div className="lg:w-[360px] flex-shrink-0 bg-gradient-to-b from-[#1b1040] to-[#0f0f0f] p-8 flex flex-col gap-4 border-r border-yt-gray lg:h-full lg:overflow-y-auto">
        <div className="w-full aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
          {likedVideos[0] && (
            <img src={likedVideos[0].thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
          <ThumbsUp size={56} className="text-white drop-shadow-lg" fill="currentColor" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Liked Videos</h1>
          <p className="text-sm text-yt-lightgray mt-1">
            You · {totalCount} item{totalCount !== 1 ? 's' : ''}
          </p>
        </div>

        {likedVideos.length > 0 && (
          <button
            onClick={clearLiked}
            className="flex items-center gap-2 bg-yt-gray hover:bg-[#3f3f3f] text-white px-4 py-2.5 rounded-full transition-colors w-fit"
          >
            <Trash2 size={16} /> Clear all
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {likedVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-24 text-center">
            <ThumbsUp size={80} className="text-[#3f3f3f] mb-6" />
            <h2 className="text-xl font-bold mb-2">No liked videos yet</h2>
            <p className="text-yt-lightgray mb-6 max-w-md">
              Videos you like will appear here. Click the 👍 button while watching any video.
            </p>
            <Link to="/" className="bg-white text-black hover:bg-gray-200 font-medium px-5 py-2.5 rounded-full transition-colors">
              Browse Videos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">

        
            {shorts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500">
                    <svg viewBox="0 0 90 90" width="20" height="20" fill="currentColor">
                      <path d="M45,0A45,45,0,1,0,90,45,45.05,45.05,0,0,0,45,0Zm16.36,48.74-22,13.19A4.25,4.25,0,0,1,33,58.19V31.81a4.25,4.25,0,0,1,6.36-3.74l22,13.19A4.25,4.25,0,0,1,61.36,48.74Z"/>
                    </svg>
                  </span>
                  <span className="text-base font-semibold text-white">Shorts</span>
                  <span className="text-xs text-yt-lightgray ml-1">({shorts.length})</span>
                </div>

               
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {shorts.map((item) => (
                    <div key={item.id + (item.likedAt || '')} className="relative flex-shrink-0 group" style={{ width: '160px' }}>
                      <Link to="/shorts">
                     
                        <div
                          className="relative rounded-xl overflow-hidden bg-black"
                          style={{ width: '160px', height: '284px' }}
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {item.views && (
                            <span className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow">
                              {item.views} views
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white font-medium mt-2 line-clamp-2 leading-snug px-0.5">
                          {item.title}
                        </p>
                        <p className="text-xs text-yt-lightgray px-0.5 mt-0.5">{item.channel}</p>
                      </Link>
                  
                      <button
                        onClick={() => toggleLike(item)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-black/90 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from Liked"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
            {videos.length > 0 && (
              <div>
                {shorts.length > 0 && (
                  <h2 className="text-base font-semibold text-white mb-4">Videos</h2>
                )}
                <div className="flex flex-col gap-2">
                  {videos.map((video, index) => (
                    <div key={video.id} className="flex gap-4 group items-start p-3 rounded-xl hover:bg-yt-gray transition-colors">
                      <span className="text-sm text-yt-lightgray w-5 flex-shrink-0 pt-1 text-center">{index + 1}</span>

                      
                      <Link
                        to={`/watch/${video.id}`}
                        className="relative flex-shrink-0 rounded-lg overflow-hidden bg-black"
                        style={{ width: '220px', height: '124px' }}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {video.duration && (
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 rounded">
                            {video.duration}
                          </span>
                        )}
                      </Link>

                 
                      <div className="flex-1 flex flex-col min-w-0">
                        <Link to={`/watch/${video.id}`}>
                          <h3 className="text-sm font-medium line-clamp-2 leading-snug hover:text-blue-400 transition-colors">
                            {video.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1.5">
                          <img src={video.profilePic} alt={video.channel} className="w-4 h-4 rounded-full object-cover" />
                          <span className="text-xs text-yt-lightgray">{video.channel}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-yt-lightgray">
                          {video.views && <span>{video.views}</span>}
                          {video.uploadedAt && <span>• {video.uploadedAt}</span>}
                        </div>
                      </div>

                      
                      <button
                        onClick={() => toggleLike(video)}
                        className="flex-shrink-0 p-2 rounded-full hover:bg-[#3f3f3f] transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from Liked"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
