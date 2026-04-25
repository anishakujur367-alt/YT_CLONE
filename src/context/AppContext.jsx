import { Link } from 'react-router-dom';
import { Clock, X, MoreVertical, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const VideoCard = ({ video }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const { addToWatchLater, removeFromWatchLater, isInWatchLater } = useAppContext();
  const isSaved = isInWatchLater(video.id);

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
    removeFromWatchLater(video.id);
    } else {
    addToWatchLater({
        id: video.id,
        title: video.title,
        channel: video.channel,
        thumbnail: video.thumbnail,
        profilePic: video.profilePic,
        views: video.views,
        duration: video.duration,
        uploadedAt: video.uploadedAt,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 group cursor-pointer relative">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Link to={`/watch/${video.id}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </Link>

        <button
          onClick={handleWatchLater}
          title={isSaved ? 'Remove from Watch Later' : 'Save to Watch Later'}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200
            ${isSaved
              ? 'bg-white/90 text-black opacity-100'
              : 'bg-black/70 text-white opacity-0 group-hover:opacity-100 hover:bg-black'
            }`}
        >
          {saved ? (
            <CheckCheck size={16} className="text-green-500" />
          ) : isSaved ? (
            <X size={16} />
          ) : (
            <Clock size={16} />
          )}
        </button>
      </div>
      <div className="flex gap-3 items-start">
        <Link to="/" className="flex-shrink-0">
          <img
            src={video.profilePic}
            alt={video.channel}
            className="w-9 h-9 rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
          <Link to={`/watch/${video.id}`}>
            <h3 className="text-base font-medium text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
          </Link>
          <Link to="/" className="text-sm text-yt-lightgray mt-1 hover:text-white transition-colors truncate">
            {video.channel}
          </Link>
          <div className="text-sm text-yt-lightgray flex items-center gap-1">
            <span>{video.views}</span>
            <span className="text-[10px]">•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="p-1 rounded-full hover:bg-yt-gray transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-56 bg-[#272727] border border-[#3f3f3f] rounded-xl shadow-2xl py-2 z-50">
                <button
                  onClick={handleWatchLater}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#3f3f3f] text-sm flex items-center gap-3 transition-colors"
                >
                  {isSaved
                    ? <><X size={16} /> Remove from Watch Later</>
                    : <><Clock size={16} /> Save to Watch Later</>
                  }
                </button>
            </div>
            </>
        )}
        </div>
    </div>
    </div>
);
};

export default VideoCard;