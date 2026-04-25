import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, MonitorPlay } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = ({ isOpen }) => {
  const { subscribedChannels } = useAppContext();
  const mainLinks = [
    { icon: <Home size={24} />, name: 'Home', path: '/' },
    { icon: <Compass size={24} />, name: 'Shorts', path: '/shorts' },
    { icon: <MonitorPlay size={24} />, name: 'Subscriptions', path: '/subscriptions' },
  ];

  const secondaryLinks = [
    { icon: <History size={24} />, name: 'History', path: '/history' },
    { icon: <PlaySquare size={24} />, name: 'Your videos', path: '/your-videos' },
    { icon: <Clock size={24} />, name: 'Watch later', path: '/watch-later' },
    { icon: <ThumbsUp size={24} />, name: 'Liked videos', path: '/liked' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>, name: 'Downloads', path: '/downloads' },
  ];

  const NavItem = ({ icon, name, path }) => (
    <NavLink 
      to={path} 
      className={({isActive}) => `flex items-center ${isOpen ? 'px-3 py-2.5 rounded-lg' : 'flex-col justify-center py-4 rounded-xl'} hover:bg-yt-gray transition-colors cursor-pointer ${isActive ? 'bg-yt-gray font-medium' : ''}`}
    >
      <div className={`${isOpen ? 'mr-4' : 'mb-1'}`}>{icon}</div>
      <span className={`${isOpen ? 'text-[15px]' : 'text-[10px]'} whitespace-nowrap`}>{name}</span>
    </NavLink>
  );

  return (
    <aside className={`${isOpen ? 'w-60 px-3' : 'w-[72px] px-1'} py-3 hidden sm:flex flex-col h-full overflow-y-auto hover:scrollbar-thumb-gray-500 transition-all duration-200 border-r border-yt-gray`}>
      <div className="flex flex-col gap-1 pb-3 border-b border-yt-gray">
        {mainLinks.map((link, idx) => (
          <NavItem key={idx} {...link} />
        ))}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-1 py-3 border-b border-yt-gray">
          <h3 className="px-3 py-2 text-lg font-medium flex items-center gap-2">You <span className="text-xl">›</span></h3>
          {secondaryLinks.map((link, idx) => (
            <NavItem key={idx} {...link} />
          ))}
        </div>
      )}

      {isOpen && subscribedChannels.length > 0 && (
        <div className="flex flex-col gap-1 py-3 border-b border-yt-gray">
          <h3 className="px-3 py-2 text-[16px] font-medium flex items-center gap-2">Subscriptions</h3>
          {subscribedChannels.map((channel, idx) => (
            <div key={idx} className="flex items-center px-3 py-2.5 rounded-lg hover:bg-yt-gray transition-colors cursor-pointer">
              <img src={channel.profilePic} alt={channel.name} className="w-6 h-6 rounded-full mr-4 object-cover" />
              <span className="text-[15px] truncate flex-1">{channel.name}</span>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div className="py-4 px-3 text-xs text-yt-lightgray font-medium leading-5">
          <p>About Press Copyright Contact us Creators Advertise Developers</p>
          <br/>
          <p>Terms Privacy Policy & Safety How YouTube works Test new features</p>
          <br/>
          <p className="text-gray-500 font-normal">© 2024 Google LLC</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
