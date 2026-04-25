import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Shorts from './pages/Shorts';
import Downloads from './pages/Downloads';
import Subscriptions from './pages/Subscriptions';
import History from './pages/History';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <AppProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-yt-black text-white">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar isOpen={isSidebarOpen} />
          <main className="flex-1 overflow-hidden bg-[#0f0f0f] flex flex-col h-full">
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />


              <Route path="/" element={<ProtectedRoute><div className="h-full overflow-y-auto"><Home /></div></ProtectedRoute>} />
              <Route path="/watch/:id" element={<ProtectedRoute><div className="h-full overflow-y-auto"><Watch /></div></ProtectedRoute>} />
              <Route path="/shorts" element={<ProtectedRoute><Shorts /></ProtectedRoute>} />
              

              <Route path="/subscriptions" element={<div className="h-full overflow-y-auto"><Subscriptions /></div>} />
              <Route path="/history" element={<div className="h-full overflow-y-auto"><History /></div>} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/liked" element={<LikedVideos />} />
              <Route path="/downloads" element={<div className="h-full overflow-y-auto"><Downloads /></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
