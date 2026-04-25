import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, Trash2, X, PlaySquare } from 'lucide-react';

const formatWatchedAt = (iso) => {
  if (!iso) return '';
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};


const groupByDate = (items) => {
  const groups = {};
  items.forEach((item) => {
    const date = new Date(item.watchedAt);
    const now = new Date();
    const diffDays = Math.floor((now - date) / 86400000);
    let label;
    if (diffDays === 0) label = 'Today';
    else if (diffDays === 1) label = 'Yesterday';
    else if (diffDays < 7) label = 'This week';
    else label = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    if (!groups[label]) groups[label] = { shorts: [], videos: [] };
    if (item.type === 'short') groups[label].shorts.push(item);
    else groups[label].videos.push(item);
  });
  return groups;
};

const History = () => {
  const { watchHistory, removeFromHistory, clearHistory } = useAppContext();

  const grouped = groupByDate(watchHistory);

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto w-full">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <HistoryIcon size={28} />
          Watch History
        </h1>
        {watchHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 bg-yt-gray hover:bg-[#3f3f3f] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Trash2 size={16} />
            Clear all history
          </button>
        )}
      </div>

      {watchHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <HistoryIcon size={80} className="text-[#3f3f3f] mb-6" />
          <h2 className="text-xl font-bold mb-2">No watch history yet</h2>
          <p className="text-yt-lightgray mb-6 max-w-md">Videos and Shorts you watch will appear here.</p>
          <Link to="/" className="bg-white text-black hover:bg-gray-200 font-medium px-5 py-2.5 rounded-full transition-colors">
            Go to Home
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([label, { shorts, videos }]) => (
            <div key={label}>

              <h2 className="text-base font-semibold text-white mb-4">{label}</h2>


              {shorts.length > 0 && (
                <div className="mb-6">

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-500">

                      <svg viewBox="0 0 90 90" width="20" height="20" fill="currentColor">
                        <path d="M45,0A45,45,0,1,0,90,45,45.05,45.05,0,0,0,45,0Zm16.36,48.74-22,13.19A4.25,4.25,0,0,1,33,58.19V31.81a4.25,4.25,0,0,1,6.36-3.74l22,13.19A4.25,4.25,0,0,1,61.36,48.74Z"/>
                      </svg>
                    </span>
                    <span className="text-base font-semibold text-white">Shorts</span>
                    <button className="ml-auto text-yt-lightgray hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                    {shorts.map((item) => (
                      <div key={item.id + item.watchedAt} className="relative flex-shrink-0 group" style={{ width: '160px' }}>
                        <Link to="/shorts">

                          <div className="relative rounded-xl overflow-hidden bg-black" style={{ width: '160px', height: '284px' }}>
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            {item.views && (
                              <span className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow">{item.views} views</span>
                            )}
                          </div>

                          <p className="text-xs text-white font-medium mt-2 line-clamp-2 leading-snug px-0.5">
                            {item.title}
                          </p>
                        </Link>

                        <button
                          onClick={() => removeFromHistory(item.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-black/90 transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove from history"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {videos.length > 0 && (
                <div className="flex flex-col gap-3">
                  {videos.map((item) => (
                    <div key={item.id + item.watchedAt} className="flex gap-4 group items-start p-3 rounded-xl hover:bg-yt-gray transition-colors">

                      <Link
                        to={`/watch/${item.id}`}
                        className="relative flex-shrink-0 rounded-lg overflow-hidden bg-black"
                        style={{ width: '220px', height: '124px' }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {item.duration && (
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 rounded">
                            {item.duration}
                          </span>
                        )}
                      </Link>


                      <div className="flex-1 flex flex-col justify-start py-0.5 min-w-0">
                        <Link to={`/watch/${item.id}`}>
                          <h3 className="text-sm font-medium line-clamp-2 leading-snug hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1.5">
                          <img src={item.profilePic} alt={item.channel} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-xs text-yt-lightgray">{item.channel}</span>
                          {item.verified && (
                            <svg className="text-yt-lightgray" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                            </svg>
                          )}
                          {item.views && <span className="text-xs text-yt-lightgray">▷ {item.views}</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-yt-lightgray">
                          {item.uploadedAt && <span>{item.uploadedAt}</span>}
                        </div>
                        <span className="text-xs text-[#717171] mt-1">Watched {formatWatchedAt(item.watchedAt)}</span>
                      </div>

                      <button
                        onClick={() => removeFromHistory(item.id)}
                        className="flex-shrink-0 p-2 rounded-full hover:bg-[#3f3f3f] transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove from history"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
