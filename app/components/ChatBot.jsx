'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import Image from 'next/image';
import { useChat } from '../context/ChatContext';

const ChatBot = () => {
    const { isOpen, openChat, closeChat, toggleChat } = useChat();
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hola, soy Aurora de AURIGITAL. ¿En qué puedo ayudarte?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const WEBHOOK_URL = "https://hook.us2.make.com/tnwgdyytvafysln4pr4abvl4wslpkn1t";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMsg = { id: Date.now(), text: inputMessage, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);

        const messageToSend = inputMessage.trim();
        setInputMessage('');
        setIsLoading(true);

        console.log('[ChatBot] Sending:', messageToSend);

        try {
            const resp = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                    message: messageToSend
                })
            });

            const raw = await resp.text();
            console.log('[ChatBot] Raw response:', raw);

            let botResp;
            try {
                const data = JSON.parse(raw);
                console.log('[ChatBot] Parsed JSON:', data);
                botResp = (data.reply ?? raw).trim();
            } catch (e) {
                console.warn('[ChatBot] Invalid JSON, using raw:', e);
                botResp = raw.trim();
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResp, sender: 'bot', timestamp: new Date() }]);
        } catch (err) {
            console.error('[ChatBot] Fetch error:', err);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Error al enviar mensaje. Intenta de nuevo.', sender: 'bot', timestamp: new Date() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <motion.div className="fixed bottom-6 right-6 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 25 }}>
                <motion.button onClick={toggleChat} className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimatePresence mode="wait">
                        {isOpen ? <X size={24} className="text-gray-700" /> : <Image src="/assets/AurigitalChat2.svg" alt="Chat" width={54} height={54} />}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="fixed inset-0 md:bottom-24 md:right-6 md:inset-auto md:w-80 md:h-96 bg-white md:rounded-lg shadow-xl flex flex-col z-40" 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9, y: 20 }} 
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <Image src="/assets/AurigitalChat2.svg" alt="Aurora" width={16} height={16} />
                                <div>
                                    <h3 className="font-qurova font-medium text-gray-900">Aurora</h3>
                                    <p className="text-xs text-gray-500 font-mansfield">Asistente Virtual</p>
                                </div>
                            </div>
                            <button onClick={closeChat} className="p-1 hover:bg-gray-100 rounded-full">
                                <X size={16} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] px-3 py-2 ${msg.sender === 'user' ? 'bg-[#B2FF00] text-black' : 'bg-gray-100 text-gray-900'} rounded-lg ${msg.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                                        <p className="text-sm font-mansfield">{msg.text}</p>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start"><div className="bg-gray-100 rounded-lg rounded-bl-sm px-3 py-2"><div className="flex space-x-1"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div></div></div></div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-gray-100 p-4">
                            <div className="flex items-center space-x-2">
                                <input ref={inputRef} type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Escribe tu mensaje..." className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none font-mansfield" disabled={isLoading} />
                                <button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} className="w-8 h-8 bg-[#B2FF00] hover:bg-[#9FE600] disabled:bg-gray-200 disabled:text-gray-400 text-black rounded-full flex items-center justify-center">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;