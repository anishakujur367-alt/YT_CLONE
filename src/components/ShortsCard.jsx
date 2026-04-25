import { MoreVertical } from 'lucide-react';

const ShortsCard = ({ short }) => {
return (
    <div className="flex flex-col gap-2 w-full max-w-[210px] cursor-pointer group">
    <div className="relative aspect-[9/16] rounded-xl overflow-hidden">
        <img 
          src={short.thumbnail || short.videoUrl.replace('.mp4', '.jpg')} // Use thumbnail if available
        alt={short.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
    </div>
    <div className="flex justify-between items-start">
        <div className="flex flex-col pr-2">
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-snug">
            {short.title}
        </h3>
        <p className="text-sm text-yt-lightgray mt-0.5">
            {short.views} views
        </p>
        </div>
        <button className="p-1 text-yt-lightgray hover:bg-yt-gray rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={18} />
        </button>
    </div>
    </div>
);
};

export default ShortsCard;