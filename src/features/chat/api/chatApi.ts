const API_URL = "http://localhost:8083";

const getToken = () => {
    return localStorage.getItem("token");
};

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});

export interface Chat {
    id: number;
    title: string;
    is_public: boolean;
    created_at: string;
}

export interface Message {
    id: number;
    text: string;
    sender_id: number;
    created_at: string;
}

export const chatApi = {
    getChats: async (page = 1, limit = 10) => {
        const response = await fetch(`${API_URL}/v1/chat/?page=${page}&limit=${limit}`, {
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error("Ошибка загрузки чатов");
        return response.json();
    },

    getMessages: async (chatId: number, page = 1, limit = 50) => {
        const response = await fetch(
            `${API_URL}/v1/chat/${chatId}/messages?page=${page}&limit=${limit}`,
            {
                headers: getHeaders(),
            },
        );
        if (!response.ok) throw new Error("Ошибка загрузки сообщений");
        return response.json();
    },

    sendMessage: async (chatId: number, text: string) => {
        const response = await fetch(`${API_URL}/v1/chat/${chatId}/messages`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ text }),
        });
        if (!response.ok) throw new Error("Ошибка отправки сообщения");
        return response.json();
    },

    createChat: async (title: string, is_public = true) => {
        const response = await fetch(`${API_URL}/v1/chat/`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ title, is_public }),
        });
        if (!response.ok) throw new Error("Ошибка создания чата");
        return response.json();
    },
};
