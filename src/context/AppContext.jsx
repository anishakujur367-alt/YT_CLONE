import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

const GUEST = { name: 'Guest', email: 'guest@youtube.com' };

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_user')) || null; } catch { return null; }
  });
  const [watchLater, setWatchLater] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_watchlater')) || []; } catch { return []; }
  });
  const [watchHistory, setWatchHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_history')) || []; } catch { return []; }
  });
  const [likedVideos, setLikedVideos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_liked')) || []; } catch { return []; }
  });
  const [downloadedVideos, setDownloadedVideos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_downloads')) || []; } catch { return []; }
  });
  const [subscribedChannels, setSubscribedChannels] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yt_subscriptions')) || []; } catch { return []; }
  });

  const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // Auth
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('yt_users') || '[]');
    if (users.find(u => u.email === email)) return { success: false, error: 'Email already registered' };
    const user = { name, email, password };
    users.push(user);
    localStorage.setItem('yt_users', JSON.stringify(users));
    const session = { name, email };
    setCurrentUser(session);
    persist('yt_user', session);
    return { success: true };
  };

  const login = (email, password) => {
    if (email === 'guest@youtube.com' && password === 'guest') {
      setCurrentUser(GUEST);
      persist('yt_user', GUEST);
      return { success: true };
    }
    const users = JSON.parse(localStorage.getItem('yt_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    const session = { name: user.name, email: user.email };
    setCurrentUser(session);
    persist('yt_user', session);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('yt_user');
  };

  // Watch Later
  const addToWatchLater = (video) => {
    setWatchLater(prev => {
      if (prev.find(v => v.id === video.id)) return prev;
      const next = [video, ...prev];
      persist('yt_watchlater', next);
      return next;
    });
  };
  const removeFromWatchLater = (id) => {
    setWatchLater(prev => { const next = prev.filter(v => v.id !== id); persist('yt_watchlater', next); return next; });
  };
  const isInWatchLater = (id) => watchLater.some(v => v.id === id);

  // History
  const addToHistory = (video) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(v => !(v.id === video.id && v.type === video.type));
      const next = [{ ...video, watchedAt: new Date().toISOString() }, ...filtered].slice(0, 200);
      persist('yt_history', next);
      return next;
    });
  };
  const removeFromHistory = (id) => {
    setWatchHistory(prev => { const next = prev.filter(v => v.id !== id); persist('yt_history', next); return next; });
  };
  const clearHistory = () => { setWatchHistory([]); localStorage.removeItem('yt_history'); };

  // Liked
  const toggleLike = (video) => {
    setLikedVideos(prev => {
      const exists = prev.find(v => v.id === video.id);
      const next = exists ? prev.filter(v => v.id !== video.id) : [{ ...video, likedAt: new Date().toISOString() }, ...prev];
      persist('yt_liked', next);
      return next;
    });
  };
  const isLiked = (id) => likedVideos.some(v => v.id === id);
  const clearLiked = () => { setLikedVideos([]); localStorage.removeItem('yt_liked'); };

  // Downloads
  const addDownload = (video) => {
    setDownloadedVideos(prev => {
      if (prev.find(v => v.id === video.id)) return prev;
      const next = [video, ...prev];
      persist('yt_downloads', next);
      return next;
    });
  };
  const removeDownload = (id) => {
    setDownloadedVideos(prev => { const next = prev.filter(v => v.id !== id); persist('yt_downloads', next); return next; });
  };
  const isDownloaded = (id) => downloadedVideos.some(v => v.id === id);

  // Subscriptions
  const toggleSubscription = (channel) => {
    setSubscribedChannels(prev => {
      const exists = prev.find(c => c.name === channel.name);
      const next = exists ? prev.filter(c => c.name !== channel.name) : [...prev, channel];
      persist('yt_subscriptions', next);
      return next;
    });
  };
  const isSubscribedTo = (name) => subscribedChannels.some(c => c.name === name);

  return (
    <AppContext.Provider value={{
      currentUser, signup, login, logout,
      watchLater, addToWatchLater, removeFromWatchLater, isInWatchLater,
      watchHistory, addToHistory, removeFromHistory, clearHistory,
      likedVideos, toggleLike, isLiked, clearLiked,
      downloadedVideos, addDownload, removeDownload, isDownloaded,
      subscribedChannels, toggleSubscription, isSubscribedTo,
    }}>
      {children}
    </AppContext.Provider>
  );
};
