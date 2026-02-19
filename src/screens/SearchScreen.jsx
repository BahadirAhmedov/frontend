import React, { useState } from 'react';
import { Search, ArrowLeft, X, MessageSquare, Hash, FileText } from 'lucide-react';

const mockResults = [
  { id: 1, type: 'chat', title: 'Веб-разработка 101', subtitle: 'Группа • 12 участников' },
  { id: 2, type: 'message', title: 'Иван Петрович', subtitle: 'обязательно используйте семантическую верстку...' },
];

export default function SearchScreen({ onClose }) {
  const [query, setQuery] = useState('');
  
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col w-full max-w-[1440px] mx-auto font-['Inter'] md:w-[600px] md:h-[800px] md:mt-10 md:rounded-2xl md:shadow-2xl md:border md:border-gray-200">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onClose} className="text-gray-500 hover:text-black p-1"><ArrowLeft className="w-6 h-6" /></button>
        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3 text-gray-400 w-5 h-5" />
          <input type="text" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск..." className="w-full bg-gray-100 rounded-xl py-2.5 pl-10 pr-10 outline-none focus:ring-2 focus:ring-[#007BFF]" />
          {query && <button onClick={() => setQuery('')} className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"><X className="w-4 h-4" /></button>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {mockResults.map(result => (
            <div key={result.id} className="flex items-start p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
              <div className={`p-2.5 rounded-xl mr-3 shrink-0 ${result.type === 'chat' ? 'bg-[#007BFF]/10 text-[#007BFF]' : 'bg-gray-100 text-gray-600'}`}>
                {result.type === 'chat' ? <Hash className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate mb-0.5">{result.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{result.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}