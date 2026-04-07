import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Mic, Image as ImageIcon, FileText, CheckCircle2, ChevronRight, Play, Search, Save, Database, Brain, Send, User, Building2, Calendar, Clock, Zap, AlertTriangle, TrendingUp, UserCheck, Target } from 'lucide-react';
import { PageId } from '../types';

interface VisitAIProps {
  onNavigate: (page: PageId) => void;
}

type VisitStage = 'pre' | 'during' | 'post';

export default function VisitAI({ onNavigate }: VisitAIProps) {
  const [stage, setStage] = useState<VisitStage>('pre');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  // Post-visit editable data
  const [postData, setPostData] = useState({
    visitor: '张伟',
    company: '中铁建设集团',
    contact: '李总监 (采购总监)',
    intent: '轴承新品 (N系列)',
    nextStep: '下周三前提交安装方案',
    priority: 'A (高优先级)'
  });

  const [todoList, setTodoList] = useState([
    { id: '1', title: '询报价：轴承新品 N-200 型号', status: 'pending', type: 'agent' },
    { id: '2', title: '同步会议纪要至 CRM', status: 'done', type: 'system' }
  ]);

  const handleExecuteTodo = (id: string) => {
    setTodoList(todoList.map(t => t.id === id ? { ...t, status: 'executing' } : t));
    setTimeout(() => {
      setTodoList(todoList.map(t => t.id === id ? { ...t, status: 'done' } : t));
      alert('Agent 已完成询报价任务，已发送至采购部。');
    }, 2000);
  };

  const renderPreVisit = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      {/* Enhanced Pre-visit Briefing using Customer360 data */}
      <div className="bg-bg-card rounded-[20px] overflow-hidden border border-primary/20">
        <div className="bg-linear-to-br from-primary to-[#8b5cf6] px-4 py-3 flex items-center gap-2">
          <Brain size={18} className="text-white" />
          <span className="font-bold text-white">Agent 访前 360° 智能简报</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-xl font-bold text-primary">中铁</div>
            <div>
              <div className="font-bold text-lg">中铁建设集团</div>
              <div className="text-xs text-text-muted flex items-center gap-2">
                <span className="px-2 py-0.5 bg-warning/20 text-warning rounded-md">⭐ 头部大客户</span>
                <span>基建工程 · 北京</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: TrendingUp, label: '年采购潜力', value: '¥2,800万 / 年', color: 'text-accent' },
              { icon: User, label: '关键决策人', value: '李总监 (采购总监) - 关系良好', color: 'text-text-primary' },
              { icon: AlertTriangle, label: '风险提示', value: '竞对正在接触，需加快节奏', color: 'text-warning' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl">
                <item.icon size={16} className={item.color} />
                <div className="flex-1">
                  <div className="text-[10px] text-text-muted">{item.label}</div>
                  <div className={`text-sm font-medium ${item.color}`}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary/10 rounded-xl border-l-4 border-primary space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Zap size={14} /> Agent 推荐开场白
            </div>
            <div className="text-[13px] text-text-secondary leading-relaxed italic">
              “李总，我注意到中铁建设近期在城际铁路项目上有很大突破，恭喜啊！我们在MRO供应链上或许能帮您进一步降本增效，特别是轴承品类...”
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg-card rounded-2xl p-5 border border-white/5 space-y-3">
        <div className="text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" /> 准备清单 (Checklist)
        </div>
        {[
          '轴承新品样本 (已备)',
          '上季度服务报告 (已生成)',
          '同行业案例 PPT (已同步至 Pad)',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
            <CheckCircle2 size={16} className="text-success" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setStage('during')}
        className="w-full py-4 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
      >
        <Play size={18} fill="currentColor" /> 进入拜访模式
      </button>
    </motion.div>
  );

  const renderDuringVisit = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2 py-4">
        <div className="text-sm text-accent font-medium animate-pulse">● 实时助手已开启</div>
        <h3 className="text-lg font-bold">正在拜访：中铁建设集团</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button className="bg-bg-card border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Mic size={20} />
          </div>
          <span className="text-[11px] font-semibold">语音查询</span>
        </button>
        <button className="bg-bg-card border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors">
          <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
            <ImageIcon size={20} />
          </div>
          <span className="text-[11px] font-semibold">拍照识物</span>
        </button>
        <button className="bg-bg-card border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors">
          <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center text-success">
            <FileText size={20} />
          </div>
          <span className="text-[11px] font-semibold">文字输入</span>
        </button>
      </div>

      {/* Text Input Area */}
      <div className="relative">
        <input 
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="输入问题，如：N系列轴承库存..."
          className="w-full bg-bg-card border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-primary"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
          <Send size={18} />
        </button>
      </div>

      <div className="bg-bg-card rounded-2xl p-5 border border-white/5 space-y-4">
        <div className="text-sm font-semibold flex items-center gap-2">
          <Brain size={16} className="text-primary" /> 实时辅助建议
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-bg-elevated rounded-xl text-[13px] text-text-secondary leading-relaxed">
            如果客户提到“价格敏感”，可以强调我们的“全生命周期成本”优势，比竞品低 15%。
          </div>
          <div className="p-3 bg-bg-elevated rounded-xl text-[13px] text-text-secondary leading-relaxed">
            检测到客户提到“交付期”，Agent 建议：我们可以提供“前置仓”方案，24小时送达。
          </div>
        </div>
      </div>

      <button 
        onClick={() => setStage('post')}
        className="w-full py-4 bg-bg-elevated text-text-primary rounded-xl font-bold border border-white/10"
      >
        结束拜访，录入纪要
      </button>
    </motion.div>
  );

  const renderPostVisit = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="bg-bg-card rounded-2xl p-6 text-center space-y-4 border border-primary/20">
        <div className="text-sm font-semibold">语音录入拜访纪要</div>
        <div className="relative w-24 h-24 mx-auto">
          <div className={`absolute inset-0 bg-primary/20 rounded-full ${isRecording ? 'animate-ping' : ''}`}></div>
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`absolute inset-0 m-2 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${isRecording ? 'bg-danger' : 'bg-primary'}`}
          >
            <Mic size={32} />
          </button>
        </div>
        <div className="text-xs text-text-muted">
          {isRecording ? '正在倾听并实时解析...' : '点击按钮开始语音录入'}
        </div>
      </div>

      {isRecording && (
        <div className="p-4 bg-bg-card rounded-2xl border border-white/5 italic text-sm text-text-secondary leading-relaxed">
          “今天和李总聊得很愉快，他们对轴承新品很感兴趣，但担心安装调试问题。我承诺会派技术团队现场指导。下周三需要提交一份详细的安装方案...”
        </div>
      )}

      {!isRecording && (
        <div className="space-y-6">
          <div className="bg-bg-card rounded-2xl p-5 border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Database size={16} className="text-success" /> AI 结构化提取结果
              </div>
              <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-md">可编辑校准</span>
            </div>
            <div className="space-y-4">
              {[
                { label: '拜访人', key: 'visitor', icon: User },
                { label: '拜访公司', key: 'company', icon: Building2 },
                { label: '关键联系人', key: 'contact', icon: UserCheck },
                { label: '意向品类', key: 'intent', icon: Target },
                { label: '后续待办', key: 'nextStep', icon: Calendar },
                { label: '商机等级', key: 'priority', icon: TrendingUp },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="text-[11px] text-text-muted flex items-center gap-1.5">
                    <item.icon size={12} /> {item.label}
                  </div>
                  <input 
                    type="text"
                    value={(postData as any)[item.key]}
                    onChange={(e) => setPostData({ ...postData, [item.key]: e.target.value })}
                    className="w-full bg-bg-elevated border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              setIsProcessing(true);
              setTimeout(() => {
                setIsProcessing(false);
                onNavigate('home');
                alert('纪要已结构化录入客户档案，待办任务已同步至日历');
              }, 1500);
            }}
            disabled={isProcessing}
            className="w-full py-4 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            确认并保存至档案
          </button>

          {/* To-do Schedule Section */}
          <div className="bg-bg-card rounded-2xl p-5 border border-white/5 space-y-4">
            <div className="text-sm font-semibold flex items-center gap-2">
              <Calendar size={16} className="text-accent" /> 待办日程 (To-do Schedule)
            </div>
            <div className="space-y-3">
              {todoList.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    {todo.status === 'done' ? (
                      <CheckCircle2 size={18} className="text-success" />
                    ) : (
                      <div className={`w-[18px] h-[18px] border-2 rounded-full ${todo.status === 'executing' ? 'border-accent animate-spin border-t-transparent' : 'border-text-muted'}`} />
                    )}
                    <span className={`text-[13px] ${todo.status === 'done' ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                      {todo.title}
                    </span>
                  </div>
                  {todo.type === 'agent' && todo.status === 'pending' && (
                    <button 
                      onClick={() => handleExecuteTodo(todo.id)}
                      className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-[11px] font-bold flex items-center gap-1"
                    >
                      <Sparkles size={12} /> Agent 执行
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={() => onNavigate('home')} className="text-primary">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">客户拜访 AI 助手</h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-bg-card mx-4 mt-4 rounded-xl border border-white/5">
        {[
          { id: 'pre', label: '访前简报' },
          { id: 'during', label: '访中助手' },
          { id: 'post', label: '访后纪要' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setStage(t.id as VisitStage)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
              stage === t.id ? 'bg-primary text-white shadow-md' : 'text-text-muted'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {stage === 'pre' && renderPreVisit()}
        {stage === 'during' && renderDuringVisit()}
        {stage === 'post' && renderPostVisit()}
      </div>
    </div>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
