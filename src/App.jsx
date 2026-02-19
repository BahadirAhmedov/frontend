import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SearchScreen from './screens/SearchScreen';
import UserProfileModal from './components/UserProfileModal';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<ChatListScreen onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/chat/:chatId" element={<ChatScreen onOpenProfile={(user) => setSelectedUser(user)} />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
        </Routes>

        {isSearchOpen && <SearchScreen onClose={() => setIsSearchOpen(false)} />}
        
        <UserProfileModal 
          isOpen={!!selectedUser} 
          userData={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      </div>
    </Router>
  );
}