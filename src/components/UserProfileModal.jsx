import React from 'react';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';

export default function UserProfileModal({ isOpen, userData, onClose }) {
  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-xl overflow-hidden relative font-['Inter'] animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1 z-10"><X className="w-5 h-5" /></button>
        <div className="p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-[#007BFF]/10 text-[#007BFF] rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm">{userData.name.charAt(0)}</div>
            {userData.isOnline && <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#28A745] border-4 border-white rounded-full"></div>}
          </div>
          <h2 className="text-xl font-bold text-center mb-1">{userData.name}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-6 ${userData.role === 'Преподаватель' ? 'bg-[#28A745]/10 text-[#28A745]' : 'bg-[#007BFF]/10 text-[#007BFF]'}`}>{userData.role}</span>
          <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <div className="flex justify-between items-end mb-2"><span className="text-sm font-semibold text-gray-700">Прогресс</span><span className="text-sm font-bold text-[#28A745]">75%</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"><div className="bg-[#28A745] h-2.5 rounded-full w-[75%]"></div></div>
          </div>
          <button className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center"><MessageSquare className="w-5 h-5 mr-2" />Написать сообщение</button>
        </div>
      </div>
    </div>
  );
}