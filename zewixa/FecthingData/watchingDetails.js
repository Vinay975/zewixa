// context/WatchlistContext.js
import React, { createContext, useState } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const toggleWatch = (hostel) => {
    setWatchlist((prev) => {
      const exists = prev.find((h) => h._id === hostel._id);
      return exists
        ? prev.filter((h) => h._id !== hostel._id)
        : [...prev, hostel];
    });
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatch }}>
      {children}
    </WatchlistContext.Provider>
  );
};
