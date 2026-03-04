import React, { useState, useEffect } from "react";
import { ArrowLeft, Send, CheckCheck, FileText, Moon, Sun } from "lucide-react";
import { chatApi } from "../api/chatApi";
import "../chat-styles.css";

interface ChatScreenProps {
    chatId?: number;
    onBack?: () => void;
}

interface Message {
    id: number;
    text: string;
    sender_id: number;
    created_at: string;
}

// Заглушки для демо-чатов
const mockMessages = {
    2: [
        {
            id: 1,
            text: "Привет! Как дела с курсовой?",
            sender_id: 2,
            created_at: "2024-02-23T10:00:00Z",
        },
        {
            id: 2,
            text: "Почти закончил, осталось немного",
            sender_id: 1,
            created_at: "2024-02-23T10:05:00Z",
        },
        { id: 3, text: "Скинь, что уже готово", sender_id: 2, created_at: "2024-02-23T10:06:00Z" },
    ],
    3: [
        { id: 1, text: "Кто сегодня дежурный?", sender_id: 3, created_at: "2024-02-23T09:00:00Z" },
        { id: 2, text: "Я", sender_id: 1, created_at: "2024-02-23T09:01:00Z" },
        {
            id: 3,
            text: "Ок, не забудь про созвон в 15:00",
            sender_id: 3,
            created_at: "2024-02-23T09:02:00Z",
        },
    ],
    4: [
        {
            id: 1,
            text: "Анна, когда сможешь созвониться?",
            sender_id: 4,
            created_at: "2024-02-23T09:30:00Z",
        },
        { id: 2, text: "Могу сегодня в 16:00", sender_id: 1, created_at: "2024-02-23T09:31:00Z" },
        { id: 3, text: "Договорились", sender_id: 4, created_at: "2024-02-23T09:32:00Z" },
    ],
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chatId, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const isMockChat = chatId && chatId !== 1;
    const currentUserId = localStorage.getItem("user_id");

    // Следим за темной темой
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Загрузка истории сообщений
    useEffect(() => {
        if (!chatId) return;

        const loadMessages = async () => {
            setLoading(true);

            if (isMockChat) {
                setTimeout(() => {
                    const mockData = mockMessages[chatId as keyof typeof mockMessages] || [];
                    const sortedMock = [...mockData].sort(
                        (a, b) =>
                            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
                    );
                    setMessages(sortedMock);
                    setLoading(false);
                }, 300);
            } else {
                try {
                    const data = await chatApi.getMessages(chatId);
                    const sortedMessages = [...(data.items || [])].sort(
                        (a, b) =>
                            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
                    );
                    setMessages(sortedMessages);
                } catch (err) {
                    console.error("Ошибка загрузки сообщений:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadMessages();
    }, [chatId, isMockChat]);

    // 👇 ПЕРИОДИЧЕСКИЙ ОПРОС НОВЫХ СООБЩЕНИЙ (каждые 3 секунды)
    useEffect(() => {
        if (!chatId || isMockChat) return;

        const interval = setInterval(async () => {
            try {
                const data = await chatApi.getMessages(chatId);
                const sortedMessages = [...(data.items || [])].sort(
                    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
                );

                // Проверяем, есть ли новые сообщения
                if (sortedMessages.length !== messages.length) {
                    setMessages(sortedMessages);
                } else if (sortedMessages.length > 0 && messages.length > 0) {
                    const lastNew = sortedMessages[sortedMessages.length - 1];
                    const lastOld = messages[messages.length - 1];
                    if (lastNew.id !== lastOld.id) {
                        setMessages(sortedMessages);
                    }
                }
            } catch (err) {
                console.error("Ошибка при опросе:", err);
            }
        }, 3000); // каждые 3 секунды

        return () => clearInterval(interval);
    }, [chatId, messages, isMockChat]);

    // Отправка сообщения
    const handleSend = async () => {
        if (!inputText.trim() || !chatId || sending || isMockChat) return;

        setSending(true);
        try {
            await chatApi.sendMessage(chatId, inputText);

            // После отправки сразу перезапрашиваем все сообщения
            const data = await chatApi.getMessages(chatId);
            const sortedMessages = [...(data.items || [])].sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            );
            setMessages(sortedMessages);
            setInputText("");
        } catch (err) {
            console.error("Ошибка отправки:", err);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-white dark:bg-[#1E293B] transition-colors duration-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007BFF]"></div>
            </div>
        );
    }

    const chatTitles: Record<number, string> = {
        1: "Общий чат",
        2: "Курсовая: Backend",
        3: "Обсуждение задач",
        4: "Проектная деятельность",
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1E293B] font-['Inter'] transition-colors duration-500">
            {/* Шапка */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] z-10 transition-colors duration-500">
                <div className="flex items-center">
                    <button
                        onClick={onBack}
                        className="mr-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Вернуться к списку чатов"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold truncate text-gray-900 dark:text-white transition-colors duration-500">
                            {chatTitles[chatId || 1]}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                            {messages.length} сообщений
                        </p>
                    </div>
                </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-500">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 p-8 transition-colors duration-500">
                        {isMockChat
                            ? "Нет сообщений в этом чате"
                            : "Нет сообщений. Напишите что-нибудь!"}
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender_id.toString() === currentUserId ? "justify-end" : "justify-start"}`}
                        >
                            {msg.sender_id.toString() !== currentUserId && (
                                <div className="w-8 h-8 mr-2 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold self-end mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-500">
                                    {msg.sender_id.toString().charAt(0)}
                                </div>
                            )}
                            <div
                                className={`max-w-[85%] md:max-w-[65%] flex flex-col p-3 ${
                                    msg.sender_id.toString() === currentUserId
                                        ? "bg-[#007BFF] text-white rounded-2xl rounded-br-sm"
                                        : "bg-white dark:bg-[#334155] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-bl-sm shadow-sm dark:shadow-gray-900/30"
                                } transition-colors duration-500`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {msg.text}
                                </p>
                                <div
                                    className={`flex items-center justify-end mt-1 text-[10px] ${
                                        msg.sender_id.toString() === currentUserId
                                            ? "text-blue-100"
                                            : "text-gray-400 dark:text-gray-500"
                                    } transition-colors duration-500`}
                                >
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                    {msg.sender_id.toString() === currentUserId && (
                                        <CheckCheck className="w-3.5 h-3.5 ml-1" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Поле ввода */}
            <div className="p-4 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
                <div className="flex items-end bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#007BFF] transition-colors duration-500">
                    <textarea
                        rows={1}
                        placeholder={
                            isMockChat
                                ? "Это демо-чат (отправка отключена)"
                                : "Введите сообщение..."
                        }
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 max-h-32 bg-transparent resize-none outline-none py-2 px-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500"
                        style={{ minHeight: "40px" }}
                        disabled={sending || isMockChat}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim() || sending || isMockChat}
                        className={`p-2 text-white rounded-xl ml-2 shadow-sm transition-all ${
                            isMockChat
                                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                                : "bg-[#007BFF] hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                {isMockChat && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2 transition-colors duration-500">
                        ⚠️ Это демонстрационный чат. Отправка сообщений доступна только в "Общем
                        чате".
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatScreen;
