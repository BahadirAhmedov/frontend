import { Head } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Приветственные сообщения
const welcomeMessages = [
    {
        id: 1,
        user: "Ассистент",
        message: "👋 Добро пожаловать в чат учебных проектов!",
        time: "10:00",
        avatar: "🤖",
    },
    {
        id: 2,
        user: "Ассистент",
        message: "✨ Здесь вы можете обсуждать проекты с командой и преподавателями",
        time: "10:01",
        avatar: "💬",
    },
    {
        id: 3,
        user: "Ассистент",
        message: "🎨 Скоро здесь появятся новые возможности!",
        time: "10:02",
        avatar: "🚀",
    },
];

const ChatRoute = () => {
    const [messages] = useState(welcomeMessages);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Сообщение:", newMessage);
        setNewMessage("");
    };

    return (
        <>
            <Head
                description="Общайтесь с командой и преподавателями в реальном времени"
                title="Чат учебных проектов"
            />

            {/* Hero секция - светлая */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-indigo-100">
                <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            Чат учебных проектов
                        </h1>
                        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Общайтесь с командой, делитесь идеями и обсуждайте проекты
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Основной контейнер чата */}
            <div className="py-4 sm:py-6 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-4xl px-3 sm:px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Шапка чата - серая */}
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <span className="text-indigo-600 text-sm">💬</span>
                                    </div>
                                    <div>
                                        <h2 className="font-medium text-gray-800 text-sm sm:text-base">
                                            Общий чат
                                        </h2>
                                        <p className="text-xs text-gray-500">3 участника</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Область сообщений */}
                        <div className="h-[400px] sm:h-[450px] overflow-y-auto p-4 space-y-4">
                            <AnimatePresence>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-sm sm:text-base">
                                            {msg.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline gap-2 mb-0.5">
                                                <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                                    {msg.user}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {msg.time}
                                                </span>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg px-3 py-2 inline-block max-w-[85%]">
                                                <p className="text-gray-700 text-xs sm:text-sm break-words">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Подсказки */}
                            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                <p className="text-xs text-indigo-700 flex items-center gap-1">
                                    <span>✨</span> Скоро: файлы, упоминания, реакции
                                </p>
                            </div>
                        </div>

                        {/* Поле ввода */}
                        <form
                            onSubmit={handleSendMessage}
                            className="border-t border-gray-200 p-3 bg-white"
                        >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Напишите сообщение..."
                                    className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                                <Button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                    Отправить
                                </Button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Блок с возможностями */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                            <div className="text-indigo-600 text-sm mb-1">⚡</div>
                            <p className="text-xs font-medium text-gray-700">Мгновенно</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                            <div className="text-indigo-600 text-sm mb-1">👥</div>
                            <p className="text-xs font-medium text-gray-700">Команда</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                            <div className="text-indigo-600 text-sm mb-1">🔔</div>
                            <p className="text-xs font-medium text-gray-700">Уведомления</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoute;
