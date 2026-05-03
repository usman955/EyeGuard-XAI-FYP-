import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ScanHistoryWidget, AIAnalysisWidget, EducationCardsWidget } from '../components/ChatWidgets';
import ImageUploader from '../components/ImageUploader';

const ChatBot = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get('topic') || 'default';

  // Vite environment variable
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  useEffect(() => {
    let initialMessages = [];
    switch (topic) {
      case 'education':
        initialMessages = [
          { text: "Hello! I'm EyeGuard AI. I can help you understand retinal diseases, symptoms, and prevention. What would you like to learn about today?", isBot: true, widget: 'education' }
        ];
        break;
      default:
        initialMessages = [
          { text: `Hello ${user?.name || 'there'}! I'm your EyeGuard-XAI assistant. How can I help you with your eye health today?`, isBot: true }
        ];
    }
    setMessages(initialMessages);
  }, [topic, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!OPENROUTER_API_KEY) {
        throw new Error("API Key is missing. Please check your .env file.");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "EyeGuard-XAI"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [
            {
              "role": "system",
              "content": "You are EyeGuard AI Assistant, a specialized medical AI focused on retinal health and ophthalmology. Provide helpful, empathetic, and professional advice about eye diseases like Diabetic Retinopathy, Glaucoma, and AMD. Always advise consulting a doctor for definitive diagnoses. Keep responses concise and formatted with markdown."
            },
            ...messages.map(m => ({
              role: m.isBot ? "assistant" : "user",
              content: m.text
            })),
            { "role": "user", "content": input }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API request failed");
      }

      const data = await response.json();
      const botText = data.choices[0]?.message?.content || "I apologize, but I'm having trouble processing that request right now.";
      
      setMessages(prev => [...prev, { text: botText, isBot: true }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        text: `Error: ${error.message}. Please ensure your API key is valid and the server is restarted.`, 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderWidget = (widgetType) => {
    switch (widgetType) {
      case 'education':
        return <EducationCardsWidget />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] pb-20 md:pb-0 relative overflow-hidden bg-surface-container-low w-full animate-fade-in">
      {/* Chat Header */}
      <div className="px-lg py-md border-b border-outline-variant bg-surface/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>robot_2</span>
          </div>
          <div>
            <h1 className="font-h2 text-h2 text-on-surface leading-tight">EyeGuard AI</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="font-body-md text-xs text-on-surface-variant uppercase tracking-widest font-bold">Online Assistant</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-lg space-y-lg bg-dot-pattern">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-start gap-md max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
              <div className={`p-md rounded-2xl shadow-sm font-body-lg prose prose-sm dark:prose-invert ${
                msg.isBot 
                  ? 'bg-white dark:bg-stone-900 border border-outline-variant/30 text-on-surface rounded-tl-none' 
                  : 'bg-primary text-on-primary rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </div>
            {msg.isBot && msg.widget && (
              <div className="mt-4 w-full">
                {renderWidget(msg.widget)}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-md animate-pulse">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">more_horiz</span>
            </div>
            <div className="bg-surface-container-high h-10 w-24 rounded-2xl rounded-tl-none"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="p-md bg-surface border-t border-outline-variant z-10 w-full">
        <form className="max-w-4xl mx-auto flex items-end gap-sm" onSubmit={handleSend}>
          <div className="flex-1 bg-surface-container-low rounded-2xl border border-outline-variant focus-within:border-primary-container transition-all shadow-inner">
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-sm px-md min-h-[48px] max-h-32 text-on-surface font-body-md" 
              placeholder="Ask anything about retinal health..." 
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#5D1F1A] text-white h-12 w-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shrink-0 shadow-lg"
          >
            <span className="material-symbols-outlined">{isLoading ? 'hourglass_empty' : 'send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
