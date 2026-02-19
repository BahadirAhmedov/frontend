import React, { useState } from 'react';
import { Bell, MessageSquare, CheckSquare, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'message', title: 'Новое сообщение', text: 'Анна: Спасибо! Посмотрю вечером.', time: '10:15', isNew: true },
  { id: 2, type: 'task', title: 'Новая задача', text: 'Загрузить отчет по Лабораторной №2', time: '09:00', isNew: true },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full max-w-[1440px] mx-auto bg-[#F9FAFB] text-black font-['Inter'] md:w-[375px] md:border-x border-gray-200 shadow-sm">
      <div className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-500 hover:text-black md:hidden"><ArrowLeft className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold flex items-center"><Bell className="w-5 h-5 mr-2 text-[#007BFF]" />Уведомления</h1>
        <span className="ml-auto bg-[#007BFF]/10 text-[#007BFF] py-1 px-3 rounded-xl text-sm font-bold">{notifications.length}</span>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className="relative w-full rounded-xl overflow-hidden bg-red-500">
            <div className="absolute inset-y-0 right-0 w-full flex justify-end items-center pr-4"><Trash2 className="w-6 h-6 text-white" /></div>
            <div className="relative flex items-start p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:-translate-x-12 transition-transform cursor-pointer">
              <div className={`p-2 rounded-full mr-3 shrink-0 ${notif.type === 'message' ? 'bg-[#007BFF]/10 text-[#007BFF]' : 'bg-[#28A745]/10 text-[#28A745]'}`}>
                {notif.type === 'message' ? <MessageSquare className="w-5 h-5" /> : <CheckSquare className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1"><h3 className="text-sm font-bold text-gray-900 truncate pr-2">{notif.title}</h3><span className="text-xs text-gray-400">{notif.time}</span></div>
                <p className="text-sm text-gray-600 line-clamp-2">{notif.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}