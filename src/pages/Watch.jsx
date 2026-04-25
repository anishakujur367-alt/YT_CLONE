import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/videos';
import { commentsByVideo, defaultComments } from '../data/comments';
import { ThumbsUp, ThumbsDown, Share2, Download as DownloadIcon, MoreHorizontal, CheckCircle, Clock, Pin, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';



const CommentItem = ({ comment, isReply = false }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => { setLiked(p => !p); if (!liked) setDisliked(false); };
  const handleDislike = () => { setDisliked(p => !p); if (!disliked) setLiked(false); };

  return (
    <div className={`flex gap-3 ${isReply ? 'ml-10 mt-3' : ''}`}>
      <img src={comment.avatar} alt={comment.author} className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white">{comment.author}</span>
          <span className="text-xs text-yt-lightgray">{comment.time}</span>
        </div>
        {comment.pinned && (
          <div className="flex items-center gap-1 text-xs text-yt-lightgray mb-1">
            <Pin size={11} className="rotate-45" />
            <span>Pinned by creator</span>
          </div>
        )}
        <p className="text-sm text-white/90 leading-relaxed mt-0.5 whitespace-pre-wrap">{comment.text}</p>
        <div className="flex items-center gap-3 mt-2">

          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs ${liked ? 'text-blue-400' : 'text-yt-lightgray hover:text-white'} transition-colors`}
          >
            <ThumbsUp size={14} fill={liked ? 'currentColor' : 'none'} />
            <span>{comment.likes}</span>
          </button>

          <button
            onClick={handleDislike}
            className={`text-xs ${disliked ? 'text-blue-400' : 'text-yt-lightgray hover:text-white'} transition-colors`}
          >
            <ThumbsDown size={14} fill={disliked ? 'currentColor' : 'none'} />
          </button>
          {!isReply && (
            <button className="text-xs text-yt-lightgray hover:text-white font-semibold transition-colors">Reply</button>
          )}
        </div>

        {!isReply && comment.replies && comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(p => !p)}
            className="flex items-center gap-1.5 mt-2 text-sm text-blue-400 hover:bg-blue-400/10 px-2 py-1 rounded-full transition-colors font-medium"
          >
            {showReplies ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>
        )}
 
        {showReplies && comment.replies && (
          <div className="flex flex-col gap-0">
            {comment.replies.map(r => (
              <CommentItem key={r.id} comment={r} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const CommentsSection = ({ videoId }) => {
  const baseComments = commentsByVideo[videoId] || defaultComments;
  const [comments, setComments] = useState(baseComments);
  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const sorted = [...comments].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  const totalReplies = comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0);
  const totalCount = comments.length + totalReplies;

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `user-${Date.now()}`,
      author: '@You',
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=you&radius=50&backgroundColor=b6e3f4`,
      text: commentText.trim(),
      likes: '0',
      time: 'Just now',
      pinned: false,
      replies: [],
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
    setIsFocused(false);
  };

  const handleCancel = () => {
    setCommentText('');
    setIsFocused(false);
  };

  return (
    <div className="mt-8">
    
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-lg font-bold">{totalCount.toLocaleString()} Comments</h3>
        <button className="flex items-center gap-1.5 text-sm text-yt-lightgray hover:text-white transition-colors font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
          Sort by
        </button>
      </div>


      <div className="flex gap-3 mb-8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
          Y
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            className="w-full bg-transparent border-b border-[#3f3f3f] focus:border-white py-1.5 outline-none text-sm transition-colors text-white placeholder-yt-lightgray"
          />
          {isFocused && (
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-yt-gray transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!commentText.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  commentText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-yt-gray text-yt-lightgray cursor-not-allowed'
                }`}
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {sorted.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const Watch = () => {

  const { id } = useParams();
  const video = videos.find(v => v.id === id) || videos[0];

  const relatedVideos = videos.filter(v => v.id !== video.id).slice(0, 10);
  
  const [likeAction, setLikeAction] = useState(null);
  const [shareText, setShareText] = useState("Share");
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const { isDownloaded, addDownload, removeDownload, toggleSubscription, isSubscribedTo, addToHistory,
          addToWatchLater, removeFromWatchLater, isInWatchLater, toggleLike, isLiked } = useAppContext();
  const downloaded = isDownloaded(video.id);
  const isSubscribed = isSubscribedTo(video.channel);
  const savedForLater = isInWatchLater(video.id);
  const liked = isLiked(video.id);

  const handleWatchLater = () => {
    if (savedForLater) {
      removeFromWatchLater(video.id);
    } else {
      addToWatchLater({
        id: video.id, title: video.title, channel: video.channel,
        thumbnail: video.thumbnail, profilePic: video.profilePic,
        views: video.views, duration: video.duration, uploadedAt: video.uploadedAt,
      });
    }
  };

  useEffect(() => {
    addToHistory({
      id: video.id,
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      profilePic: video.profilePic,
      views: video.views,
      duration: video.duration,
      uploadedAt: video.uploadedAt,
      type: 'video',
    });
  }, [video.id]);

  const handleSubscribe = () => {
    toggleSubscription({ name: video.channel, profilePic: video.profilePic });
  };

  const [dislikeActive, setDislikeActive] = useState(false);

  const handleLike = () => {
    if (!liked) setDislikeActive(false);
    toggleLike({
      id: video.id, title: video.title, channel: video.channel,
      thumbnail: video.thumbnail, profilePic: video.profilePic,
      views: video.views, duration: video.duration, uploadedAt: video.uploadedAt,
      type: 'video',
    });
  };

  const handleDislike = () => {
    if (!dislikeActive && liked) {
      toggleLike({
        id: video.id, title: video.title, channel: video.channel,
        thumbnail: video.thumbnail, profilePic: video.profilePic,
        views: video.views, duration: video.duration, uploadedAt: video.uploadedAt,
        type: 'video',
      });
    }
    setDislikeActive(p => !p);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText("Copied!");
    setTimeout(() => setShareText("Share"), 2000);
  };

  const handleDownload = () => {
    if (downloaded) {
      removeDownload(video.id);
    } else {
      addDownload(video);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1800px] mx-auto w-full">
      <div className="flex-1 lg:w-[70%]">
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <iframe 
            width="100%" 
            height="100%" 
            src={`${video.videoUrl}?autoplay=1`} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        
        <h1 className="text-xl font-bold mt-4 mb-2">{video.title}</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={video.profilePic} alt={video.channel} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-bold text-base flex items-center gap-1">
                {video.channel}
                <CheckCircle size={14} className="text-gray-400" />
              </div>
              <div className="text-xs text-yt-lightgray">1.2M subscribers</div>
            </div>
            <button 
              onClick={handleSubscribe}
              className={`${isSubscribed ? 'bg-[#272727] text-white hover:bg-[#3f3f3f]' : 'bg-white text-black hover:bg-gray-200'} font-medium px-4 py-2 rounded-full transition-colors ml-2`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 lg:pb-0 relative">
            <div className="flex items-center bg-yt-gray rounded-full">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] rounded-l-full transition-colors border-r border-[#3f3f3f] ${liked ? 'text-blue-400' : ''}`}
              >
                <ThumbsUp size={20} fill={liked ? 'currentColor' : 'none'} />
                <span className="text-sm font-medium">45K</span>
              </button>
              <button 
                onClick={handleDislike}
                className={`px-4 py-2 hover:bg-[#3f3f3f] rounded-r-full transition-colors ${dislikeActive ? 'text-blue-400' : ''}`}
              >
                <ThumbsDown size={20} fill={dislikeActive ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-yt-gray hover:bg-[#3f3f3f] px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              <Share2 size={20} />
              <span className="text-sm font-medium">{shareText}</span>
            </button>
            
            <button 
              onClick={handleDownload}
              className={`flex items-center gap-2 ${downloaded ? 'bg-white text-black hover:bg-gray-200' : 'bg-yt-gray hover:bg-[#3f3f3f]'} px-4 py-2 rounded-full transition-colors whitespace-nowrap`}
            >
              <DownloadIcon size={20} />
              <span className="text-sm font-medium hidden sm:inline">{downloaded ? 'Downloaded' : 'Download'}</span>
            </button>

            <button
              onClick={handleWatchLater}
              className={`flex items-center gap-2 ${savedForLater ? 'bg-white text-black hover:bg-gray-200' : 'bg-yt-gray hover:bg-[#3f3f3f]'} px-4 py-2 rounded-full transition-colors whitespace-nowrap`}
            >
              <Clock size={20} />
              <span className="text-sm font-medium hidden sm:inline">{savedForLater ? 'Saved' : 'Save'}</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="bg-yt-gray hover:bg-[#3f3f3f] p-2 rounded-full transition-colors"
              >
                <MoreHorizontal size={20} />
              </button>
              
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#272727] rounded-xl shadow-xl py-2 z-50 border border-[#3f3f3f]">
                  <button onClick={() => setShowMoreMenu(false)} className="w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm">Save to playlist</button>
                  <button onClick={() => setShowMoreMenu(false)} className="w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm">Report</button>
                  <button onClick={() => setShowMoreMenu(false)} className="w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm">Show transcript</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-yt-gray rounded-xl p-3 text-sm mt-4 hover:bg-[#3f3f3f] transition-colors cursor-pointer">
          <div className="font-medium mb-1">
            {video.views} • {video.uploadedAt}
          </div>
          <p className="whitespace-pre-wrap">{video.description}</p>
        </div>
        

        <CommentsSection videoId={video.id} />
      </div>

      <div className="lg:w-[30%] xl:w-[400px] flex flex-col gap-4">
        {relatedVideos.map((v) => (
          <Link key={v.id} to={`/watch/${v.id}`} className="flex gap-2 group cursor-pointer">
            <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 rounded">
                {v.duration}
              </div>
            </div>
            <div className="flex flex-col py-0.5 pr-2">
              <h3 className="text-sm font-medium text-white line-clamp-2 leading-snug group-hover:text-blue-400">
                {v.title}
              </h3>
              <p className="text-xs text-yt-lightgray mt-1">{v.channel}</p>
              <p className="text-xs text-yt-lightgray">{v.views} • {v.uploadedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watch;