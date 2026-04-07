import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { chatWithAgent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `我是您的销售Agent，具备**自主分析、智能决策、任务执行**能力。我可以帮您：\n\n🔍 分析客户，发现商机\n📝 生成方案，辅助报价\n📞 代为执行，自动跟进\n🎯 调用Skills，复制经验`,
      actions: ['分析中铁建设', '今日任务', '生成报价单']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithAgent(text, history);
      const agentMsg: Message = { id: (Date.now() + 1).toString(), role: 'agent', content: response };
      setMessages(prev => [...prev, agentMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'agent', content: '抱歉，我现在遇到了一点问题，请稍后再试。' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-114px)]"
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-12 h-12 bg-linear-to-br from-primary to-[#8b5cf6] rounded-2xl flex items-center justify-center text-2xl shadow-lg">🤖</div>
        <div className="flex-1">
          <h3 className="text-base font-semibold">销售Agent</h3>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
            在线 · 随时为您服务
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'agent' ? 'bg-linear-to-br from-primary to-[#8b5cf6] text-lg' : 'bg-bg-elevated text-sm'
            }`}>
              {msg.role === 'agent' ? '🤖' : '张'}
            </div>
            <div className="max-w-[75%] space-y-2.5">
              <div className={`p-3.5 rounded-[18px] text-sm leading-relaxed ${
                msg.role === 'agent' ? 'bg-bg-card rounded-bl-sm' : 'bg-linear-to-br from-primary to-[#8b5cf6] rounded-br-sm'
              }`}>
                <div className="markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              {msg.actions && (
                <div className="flex flex-wrap gap-2">
                  {msg.actions.map((action, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(action)}
                      className="bg-primary/20 border border-primary/30 px-3.5 py-2 rounded-full text-[13px] text-primary hover:bg-primary/30 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-9 h-9 bg-linear-to-br from-primary to-[#8b5cf6] rounded-xl flex items-center justify-center text-lg shrink-0">🤖</div>
            <div className="bg-bg-card p-3.5 rounded-[18px] rounded-bl-sm flex gap-1 items-center">
              <span className="typing-dot"></span>
              <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
              <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-bg-dark border-t border-white/5 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['分析客户商机', '生成拜访计划', '调用话术Skills', '代执行任务'].map((prompt, i) => (
            <button 
              key={i}
              onClick={() => setInput(prompt)}
              className="shrink-0 bg-bg-card border border-white/10 px-3.5 py-2 rounded-2xl text-[13px] text-text-secondary whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex gap-2.5">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="告诉Agent你需要什么..."
            className="flex-1 bg-bg-card border border-white/10 rounded-full px-4.5 py-3 text-[15px] outline-hidden focus:border-primary/50 transition-colors"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-linear-to-br from-primary to-[#8b5cf6] rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
