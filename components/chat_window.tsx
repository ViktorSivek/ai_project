"use client"

import { useState } from 'react';
import Image from "next/image";

type ChatMessage = {
    type: 'question' | 'response';
    text: string;
};

const Chat_window = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    const handleMessageChange = (event:any) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (message.trim()) {
            setChatHistory([...chatHistory, { type: 'question', text: message }]);

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                console.log("Raw fetch response:", response);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const responseData = await response.json();
                console.log("Response data received:", responseData);

                setChatHistory(chatHistory => [...chatHistory, { type: 'response', text: responseData.message }]);

                // Clear the input after sending
                setMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };
  
    return (
        <div className="sm:max-w-xl lg:max-w-4xl mx-auto p-4 pt-16 pb-16">

            <div className="bg-white rounded-lg shadow-md p-4">

                <div className="flex items-center mb-4">
                    <div className="ml-3">
                        <p className="text-xl font-medium">Your AI Assistant</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'response' ? 'items-start' : 'items-end justify-end'}`}>
                            <div className={`${chat.type === 'response' ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'} p-3 rounded-lg`}>
                                <p className="text-sm">{chat.text}</p>
                            </div>
                        </div>
                    ))}
                </div>


                <form onSubmit={handleSubmit} className="mt-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none"
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">Send</button>
                </form>
            </div>
        </div>
    )
}
 
export default Chat_window;

