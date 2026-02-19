import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Folder, Bell, Moon, Sun, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockChats = [
  { id: 1, name: 'Дипломный проект: UI/UX', lastMessage: 'Пожалуйста, проверьте последн...', time: '14:30', unread: 2, avatarBg: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Курсовая: Backend', lastMessage: 'Вы: Я залил обновление API.', time: 'Вчера', unread: 0, avatarBg: 'bg-blue-100 text-blue-700' },
  { id: 3, name: 'Обсуждение задач', lastMessage: 'Скриншот ошибки во вложении', time: '10:15', unread: 5, avatarBg: 'bg-purple-100 text-purple-700' },
];

export default function ChatListScreen({ onOpenSearch }) {
  const navigate = useNavigate();
  
  // Состояния для интерактива
  const [activeTab, setActiveTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState('chats');

  // Эффект для переключения темной темы на уровне всего документа
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    // Главный фон с плавной сменой цвета (Apple-style)
    <div className="flex h-screen w-full max-w-[1440px] mx-auto bg-[#F8FAFC] dark:bg-[#0F172A] font-['Inter'] transition-colors duration-500">
      
      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <div className="flex flex-col w-full md:w-[350px] bg-white dark:bg-[#1E293B] border-r border-gray-200 dark:border-gray-800 h-full transition-colors duration-500 shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-10">
        
        {/* Шапка */}
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#007BFF] p-2 rounded-xl group-hover:scale-105 group-active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#007BFF] dark:text-blue-400 tracking-tight">EduChat</h1>
          </div>
          
          {/* Кнопка смены темы с плавной ротацией */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-gray-400 hover:text-[#007BFF] dark:hover:text-yellow-400 bg-gray-50 dark:bg-gray-800 rounded-full hover:scale-110 active:scale-90 transition-all duration-300"
          >
            {isDark ? <Sun className="w-5 h-5 rotate-90 animate-[spin_0.5s_ease-out_forwards]" /> : <Moon className="w-5 h-5 -rotate-90 animate-[spin_0.5s_ease-out_forwards]" />}
          </button>
        </div>

        {/* Поиск */}
        <div className="px-5 mb-4 group">
          <div className="relative overflow-hidden rounded-xl border border-transparent dark:border-gray-700 transition-all duration-300 focus-within:border-[#007BFF] focus-within:shadow-[0_0_0_3px_rgba(0,123,255,0.1)]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-[#007BFF]" />
            <input 
              type="text" 
              placeholder="Поиск..." 
              onClick={onOpenSearch}
              className="w-full bg-gray-100/80 dark:bg-gray-800/80 dark:text-white py-2.5 pl-9 pr-4 text-sm outline-none transition-all cursor-pointer placeholder-gray-400"
              readOnly
            />
          </div>
        </div>

        {/* Интерактивные вкладки */}
        <div className="px-5 flex gap-2 mb-2">
          {[
            { id: 'all', label: 'Все' },
            { id: 'personal', label: 'Личные' },
            { id: 'groups', label: 'Группы' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 active:scale-95 ${
                activeTab === tab.id 
                  ? 'border border-[#007BFF] bg-[#007BFF]/10 text-[#007BFF] dark:bg-blue-500/20 dark:text-blue-400 shadow-sm' 
                  : 'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border-b border-gray-100 dark:border-gray-800 my-2 transition-colors duration-500"></div>

        {/* Список чатов с Apple-подобным hover'ом */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1 no-scrollbar">
          {mockChats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => navigate(`/chat/${chat.id}`)} 
              className="group flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105 ${chat.avatarBg} dark:bg-opacity-20 dark:text-opacity-90`}>
                {chat.name.charAt(0)}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate pr-2 group-hover:text-[#007BFF] dark:group-hover:text-blue-400 transition-colors">
                    {chat.name}
                  </h3>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-[#007BFF] rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-md shadow-blue-500/30">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Нижняя навигация */}
        <div className="flex justify-around items-center p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1E293B] transition-colors duration-500">
          <button onClick={() => setActiveNav('chats')} className={`flex flex-col items-center transition-all duration-300 active:scale-90 ${activeNav === 'chats' ? 'text-[#007BFF]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <MessageSquare className={`w-6 h-6 mb-1 ${activeNav === 'chats' ? 'fill-blue-50' : ''}`} />
            <span className="text-[10px] font-semibold">Чаты</span>
          </button>
          <button onClick={() => setActiveNav('projects')} className={`flex flex-col items-center transition-all duration-300 active:scale-90 ${activeNav === 'projects' ? 'text-[#007BFF]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <Folder className={`w-6 h-6 mb-1 ${activeNav === 'projects' ? 'fill-blue-50' : ''}`} />
            <span className="text-[10px] font-medium">Проекты</span>
          </button>
          <button onClick={() => { setActiveNav('notifications'); navigate('/notifications'); }} className={`flex flex-col items-center transition-all duration-300 active:scale-90 ${activeNav === 'notifications' ? 'text-[#007BFF]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <Bell className={`w-6 h-6 mb-1 ${activeNav === 'notifications' ? 'fill-blue-50' : ''}`} />
            <span className="text-[10px] font-medium">Уведомления</span>
          </button>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ (Пустое состояние с плавающей анимацией) */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden">
        {/* Декоративный размытый круг на фоне для красоты в темной теме */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#007BFF]/5 dark:bg-[#007BFF]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center hover:-translate-y-2 transition-transform duration-500 cursor-default">
          <div className="w-24 h-24 bg-white dark:bg-[#1E293B] rounded-full flex items-center justify-center shadow-lg shadow-gray-200/50 dark:shadow-black/20 mb-6 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
            <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-500">Выберите чат</h2>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs text-center transition-colors duration-500">
            Общайтесь со студентами и преподавателями в реальном времени
          </p>
        </div>
      </div>

    </div>
  );
}