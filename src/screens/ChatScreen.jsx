import React, { useState } from 'react';
import { ArrowLeft, Paperclip, Smile, Send, MoreVertical, FileText, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const participants = [
  { id: 1, name: 'Иван Петрович', role: 'Преподаватель', isOnline: true },
  { id: 2, name: 'Анна Смирнова', role: 'Студент', isOnline: true },
];

const initialMessages = [
  { id: 1, text: 'Привет всем! Как успехи с практической работой?', sender: participants[0], time: '10:00', isMe: false },
  { id: 2, text: 'Здравствуйте! Я почти закончила первую часть.', sender: participants[1], time: '10:05', isMe: false },
  { id: 3, text: 'Отлично. Вот методичка.', sender: participants[0], time: '10:12', isMe: false, file: 'Методичка_Лаб2.pdf' },
  { id: 4, text: 'Спасибо! Посмотрю вечером.', time: '10:15', isMe: true, status: 'read' }, 
];

export default function ChatScreen({ onOpenProfile }) {
  const [messages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full max-w-[1440px] mx-auto bg-white text-black font-['Inter']">
      <div className="hidden md:flex flex-col w-[300px] border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b border-gray-200"><h2 className="text-lg font-bold">Участники (2)</h2></div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {participants.map(user => (
            <div key={user.id} onClick={() => onOpenProfile(user)} className="flex items-center p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">{user.name.charAt(0)}</div>
                {user.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#28A745] border-2 border-white rounded-full"></div>}
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold truncate">{user.name}</h3>
                <span className={`text-xs font-medium ${user.role === 'Преподаватель' ? 'text-[#28A745]' : 'text-[#007BFF]'}`}>{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white z-10">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="md:hidden mr-3 text-gray-500 hover:text-black"><ArrowLeft className="w-6 h-6" /></button>
            <div><h1 className="text-lg font-bold truncate">Веб-разработка 101</h1><p className="text-sm text-gray-500">2 участника, 2 онлайн</p></div>
          </div>
          <button className="text-gray-500 hover:text-black"><MoreVertical className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F9FAFB]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              {!msg.isMe && <div className="w-8 h-8 mr-2 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold self-end mb-1 cursor-pointer" onClick={() => onOpenProfile(msg.sender)}>{msg.sender.name.charAt(0)}</div>}
              <div className={`max-w-[85%] md:max-w-[65%] flex flex-col ${msg.isMe ? 'bg-[#007BFF] text-white rounded-2xl rounded-br-sm' : 'bg-white border border-gray-200 text-black rounded-2xl rounded-bl-sm shadow-sm'} p-3`}>
                {!msg.isMe && <span className={`text-xs font-bold mb-1 ${msg.sender.role === 'Преподаватель' ? 'text-[#28A745]' : 'text-[#007BFF]'}`}>{msg.sender.name}</span>}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                {msg.file && <div className={`mt-2 flex items-center p-2 rounded-lg border cursor-pointer ${msg.isMe ? 'bg-blue-600 border-blue-500' : 'bg-gray-50 border-gray-200'}`}><FileText className="w-5 h-5 mr-2" /><span className="text-sm truncate font-medium">{msg.file}</span></div>}
                <div className={`flex items-center justify-end mt-1 text-[10px] ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}><span>{msg.time}</span>{msg.isMe && <CheckCheck className="w-3.5 h-3.5 ml-1" />}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-end bg-gray-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#007BFF]">
            <button className="p-2 text-gray-500 hover:text-gray-700"><Paperclip className="w-5 h-5" /></button>
            <textarea rows={1} placeholder="Написать сообщение..." value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex-1 max-h-32 bg-transparent resize-none outline-none py-2 px-2 text-sm" style={{ minHeight: '40px' }} />
            <button className="p-2 text-gray-500 hover:text-gray-700"><Smile className="w-5 h-5" /></button>
            <button className="p-2 bg-[#007BFF] text-white rounded-xl hover:bg-blue-600 ml-2 shadow-sm"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}