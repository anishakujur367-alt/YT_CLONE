import { useAppContext } from '../context/AppContext';
import { Bell, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  const { subscribedChannels } = useAppContext();

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full h-full">
      <h1 className="text-2xl font-bold mb-8">All Subscriptions</h1>
      
      {subscribedChannels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center mt-10">
          <MonitorPlay size={80} className="text-[#3f3f3f] mb-6" />
          <h2 className="text-xl font-bold mb-2">Don't miss new videos</h2>
          <p className="text-yt-lightgray mb-6 max-w-md">Subscribe to channels to see their latest videos here.</p>
          <Link to="/" className="bg-white text-black hover:bg-gray-200 font-medium px-4 py-2.5 rounded-full transition-colors">
            Browse Channels
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {subscribedChannels.map((channel, idx) => (
            <div key={idx} className="flex flex-col items-center p-6 bg-yt-gray rounded-xl hover:bg-[#3f3f3f] transition-colors cursor-pointer border border-transparent hover:border-[#4d4d4d]">
              <img src={channel.profilePic} alt={channel.name} className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg" />
              <h3 className="text-lg font-bold mb-1 truncate w-full text-center">{channel.name}</h3>
              <p className="text-xs text-yt-lightgray mb-4">1.2M subscribers</p>
              
              <button className="bg-[#272727] border border-[#4d4d4d] hover:bg-[#4d4d4d] px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                <Bell size={16} /> Subscribed
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
