import { shorts } from '../data/shorts';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, MoreHorizontal, X, RefreshCw } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const DUMMY_COMMENTS = [
  { id: 1, user: "@user123", text: "This is amazing! 🔥", time: "2 hours ago", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" },
  { id: 2, user: "@coolperson", text: "Great content as always.", time: "5 hours ago", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" },
];

const ShortItem = ({ short, isActive }) => {
  const { toggleSubscription, isSubscribedTo, addToHistory, toggleLike, isLiked } = useAppContext();
  const isSubscribed = isSubscribedTo(short.channel);
  const liked = isLiked(short.id);
  
  const [dislikeActive, setDislikeActive] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsList, setCommentsList] = useState(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isActive) {
      addToHistory({
        id: short.id,
        title: short.title,
        channel: short.channel,
        thumbnail: short.thumbnail,
        profilePic: short.profilePic,
        views: short.views,
        duration: null,
        uploadedAt: null,
        type: 'short',
      });
    }
  }, [isActive]);

  const handleSubscribe = () => toggleSubscription({ name: short.channel, profilePic: short.profilePic });
  const handleLike = () => {
    if (dislikeActive) setDislikeActive(false);
    toggleLike({
      id: short.id, title: short.title, channel: short.channel,
      thumbnail: short.thumbnail, profilePic: short.profilePic,
      views: short.views, duration: null, uploadedAt: null,
      type: 'short',
    });
  };
  
  const handleDislike = () => {
    if (!dislikeActive && liked) {
      toggleLike({
        id: short.id, title: short.title, channel: short.channel,
        thumbnail: short.thumbnail, profilePic: short.profilePic,
        views: short.views, duration: null, uploadedAt: null,
        type: 'short',
      });
    }
    setDislikeActive(p => !p);
  };
  const [shareText, setShareText] = useState("Share");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText("Copied!");
    setTimeout(() => setShareText("Share"), 2000);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: "@you",
      text: newComment,
      time: "Just now",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop"
    };
    
    setCommentsList([comment, ...commentsList]);
    setNewComment("");
  };

  return (
    <div className="h-full w-full flex items-center justify-center py-4 relative">
      <div className="flex gap-4 items-end h-[calc(100vh-100px)] max-h-[850px] min-h-[500px]">
        
       
        <div className="relative w-[340px] sm:w-[400px] h-full bg-black rounded-xl overflow-hidden shadow-xl group flex-shrink-0">
          
    
          <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
            {isActive ? (
              <iframe 
                src={`${short.videoUrl}?autoplay=1&controls=0&rel=0&showinfo=0&loop=1`}
                title={short.title}
                className="w-[300%] h-full scale-[1.2]" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover opacity-70" />
            )}
          </div>

    
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none">
            <div className="flex items-center gap-2 mb-3 pointer-events-auto">
              <img src={short.profilePic} alt={short.channel} className="w-8 h-8 rounded-full border border-white/20" />
              <span className="font-medium text-[15px]">@{short.channel.replace(/\s+/g, '')}</span>
              <button 
                onClick={handleSubscribe}
                className={`${isSubscribed ? 'bg-transparent text-white border border-white' : 'bg-white text-black'} text-xs font-bold px-3 py-1.5 rounded-full ml-2 transition-colors`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <h3 className="text-sm font-medium pointer-events-auto leading-snug">{short.title}</h3>
          </div>


          <div className={`absolute bottom-0 left-0 w-full h-[70%] bg-[#212121] rounded-t-xl flex flex-col z-50 transition-transform duration-300 ${isCommentsOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex items-center justify-between p-4 border-b border-[#3f3f3f]">
              <h2 className="font-bold text-lg">Comments</h2>
              <button onClick={() => setIsCommentsOpen(false)} className="p-2 hover:bg-[#3f3f3f] rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 hide-scrollbar">
              {commentsList.map(c => (
                <div key={c.id} className="flex gap-3">
                  <img src={c.avatar} className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-gray-300">{c.user}</span>
                      <span className="text-gray-500">{c.time}</span>
                    </div>
                    <p className="text-sm mt-1">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[#3f3f3f] flex items-center gap-3 bg-[#212121]">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full flex-shrink-0" />
              <form onSubmit={handleAddComment} className="flex-1">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="w-full bg-transparent border-b border-yt-gray focus:border-white py-1 outline-none text-sm transition-colors"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 mb-4 items-center">
          <button onClick={handleLike} className="flex flex-col items-center group">
            <div className={`p-3.5 rounded-full transition-colors mb-1.5 ${liked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yt-gray hover:bg-[#3f3f3f]'}`}>
              <ThumbsUp size={24} fill={liked ? 'currentColor' : 'none'} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">{short.likes}</span>
          </button>
          
          <button onClick={handleDislike} className="flex flex-col items-center group">
            <div className={`p-3.5 rounded-full transition-colors mb-1.5 ${dislikeActive ? 'bg-yt-gray/80' : 'bg-yt-gray hover:bg-[#3f3f3f]'}`}>
              <ThumbsDown size={24} fill={dislikeActive ? 'currentColor' : 'none'} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">Dislike</span>
          </button>
          
          <button onClick={() => setIsCommentsOpen(true)} className="flex flex-col items-center group">
            <div className="p-3.5 bg-yt-gray rounded-full hover:bg-[#3f3f3f] transition-colors mb-1.5">
              <MessageSquare size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">{commentsList.length > 0 ? commentsList.length + 'K' : '0'}</span>
          </button>
          
          <button onClick={handleShare} className="flex flex-col items-center group">
            <div className={`p-3.5 rounded-full transition-colors mb-1.5 ${shareText === 'Copied!' ? 'bg-yt-gray/80 text-white' : 'bg-yt-gray hover:bg-[#3f3f3f]'}`}>
              <Share2 size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">{shareText}</span>
          </button>

          <button className="flex flex-col items-center group">
            <div className="p-3.5 bg-yt-gray rounded-full hover:bg-[#3f3f3f] transition-colors mb-1.5">
              <RefreshCw size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">Remix</span>
          </button>
          
          <button className="flex flex-col items-center group mt-2">
            <img src={short.profilePic} className="w-10 h-10 rounded-lg object-cover" />
          </button>
        </div>
        
      </div>
    </div>
  );
};

const Shorts = () => {
  const containerRef = useRef(null);
  const [activeShortId, setActiveShortId] = useState(null);
  
  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveShortId(entry.target.getAttribute('data-id'));
        }
      });
    }, options);

    const elements = document.querySelectorAll('.short-item-wrapper');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [shorts]);
  
  return (
    <div className="h-full w-full flex justify-center bg-[#0f0f0f]">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar pb-20"
      >
        {shorts.map((short) => (
          <div key={short.id} data-id={short.id} className="short-item-wrapper h-full w-full snap-start">
            <ShortItem short={short} isActive={activeShortId === short.id || (!activeShortId && short.id === shorts[0].id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shorts;