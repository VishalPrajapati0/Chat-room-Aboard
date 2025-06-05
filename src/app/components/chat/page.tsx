'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FiSmile, FiPaperclip, FiMic } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { BsCheck2All, BsCheck2 } from 'react-icons/bs';

function ChatRoom() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hey there! 👋', sender: 'other', time: '10:30 AM', status: 'read' },
        { id: 2, text: 'How are you doing today?', sender: 'other', time: '10:31 AM', status: 'read' },
        { id: 3, text: "I'm doing great! Thanks for asking. 😊", sender: 'me', time: '10:33 AM', status: 'read' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages([...messages, message]);
        setNewMessage('');

        // Simulate reply after 1-3 seconds
        setTimeout(() => {
            setIsTyping(true);
        }, 1000);

        setTimeout(() => {
            const replies = [
                "That's interesting!",
                "Tell me more about that.",
                "I see what you mean.",
                "Absolutely!",
                "What else is on your mind?",
                "That makes sense."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const reply = {
                id: messages.length + 2,
                text: randomReply,
                sender: 'other',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'read'
            };

            setMessages(prev => [...prev, reply]);
            setIsTyping(false);
        }, 2000 + Math.random() * 2000);
    };


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 shadow-md">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 font-bold mr-3">
                        AI
                    </div>
                    <div>
                        <h2 className="font-semibold">AI Assistant</h2>
                        <p className="text-xs opacity-80">
                            {isTyping ? 'typing...' : 'online'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === 'me'
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none'
                                : 'bg-white text-gray-800 rounded-bl-none shadow'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{message.text}</p>
                            <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                <span>{message.time}</span>
                                {message.sender === 'me' && (
                                    message.status === 'read' ? (
                                        <BsCheck2All className="text-blue-200" />
                                    ) : (
                                        <BsCheck2 className="text-blue-200" />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow p-3">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="border-t border-gray-200 p-3 bg-white">
                <div className="flex items-center">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
                        <FiSmile size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full">
                        <FiPaperclip size={20} />
                    </button>
                    <div className="flex-1 mx-2">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full border border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none max-h-32"
                            rows="1"
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`p-2 rounded-full ${newMessage.trim() ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-400'}`}
                    >
                        {newMessage.trim() ? <IoMdSend size={20} /> : <FiMic size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;