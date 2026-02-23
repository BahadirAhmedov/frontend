import React, { useState } from "react";
import { X } from "lucide-react";
import ChatListScreen from "./ChatListScreen";
import ChatScreen from "./ChatScreen";

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Затемнение фона */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Модальное окно на весь экран */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-6xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden flex">
                    {/* Левая панель - список чатов (350px) */}
                    <div className="w-[350px] border-r border-gray-200 flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">Чаты</h2>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <ChatListScreen onSelectChat={setSelectedChatId} />
                        </div>
                    </div>

                    {/* Правая панель - выбранный чат или заглушка */}
                    <div className="flex-1 flex flex-col">
                        {selectedChatId ? (
                            <ChatScreen
                                chatId={selectedChatId}
                                onBack={() => setSelectedChatId(null)}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400">
                                Выберите чат для начала общения
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
