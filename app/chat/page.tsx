"use client"

import Navbar from "@/components/navbar";
import Chat_window from "@/components/chat_window";
import Table from "@/components/table";
import Footer from "@/components/footer";

import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

//   async function handleSendMessage(event) {
//     event.preventDefault();
//     if (!input.trim()) return;
  
//     const userMessage = { author: 'User', content: input };
//     setMessages([...messages, userMessage]);
  
//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input })
//       });
//       const data = await response.json();
//       const botMessage = { author: 'Bot', content: data.response };
//       setMessages(messages => [...messages, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
  
//     setInput('');
//   }

  return (
    <>
      <Navbar />
      <Table />
      <Chat_window />
      <Footer />
      {/* <div>
        <div id="message-area">
          {messages.map((msg, index) => (
            <p key={index}><strong>{}:</strong> {}</p>
          ))}
        </div>
        <form >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </div> */}
    </>
  );
}