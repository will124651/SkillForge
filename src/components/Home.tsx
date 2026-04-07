import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Zap, Target, Flame, Lightbulb, Sparkles, User, Users } from 'lucide-react';
import { Insight, PageId } from '../types';
import ManagerDashboard from './ManagerDashboard';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [role, setRole] = useState<'sales' | 'manager'>('sales');

  const insights: Insight[] = [
    {
      id: '1',
      type: 'urgent',
      title: '中铁建设 - 采购窗口期',
      description: '检测到该客户进入采购决策期，需求信号强度 92%，预计采购金额 ¥120万',
      meta: '📊 AI置信度 87% | ⏰ 最佳联系时间: 今日',
      priorityLabel: '紧急',
      icon: '🔥'
    },
    {
      id: '2',
      type: 'opportunity',
      title: '华为技术 - 需求信号',
      description: '检测到新品类需求意向，可能拓展至工具类目，增量潜力 ¥35万/年',
      meta: '📊 AI置信度 72%',
      priorityLabel: '商机',
      icon: '💡'
    }
  ];

  const renderSalesContent = () => (
    <motion.div 
      key="sales"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Agent Thinking Panel */}
      <div className="mx-4 p-4 bg-linear-to-br from-primary/15 to-[#8b5cf6]/10 border border-primary/30 rounded-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-linear-to-br from-primary to-[#8b5cf6] rounded-xl flex items-center justify-center text-[22px] shadow-[0_4px_12px_rgba(99,102,241,0.4)]">🤖</div>
          <div>
            <div className="font-semibold text-[15px]">Agent 实时洞察</div>
            <div className="text-xs text-text-secondary">刚刚更新</div>
          </div>
        </div>
        <div className="text-sm leading-relaxed text-text-secondary">
          我发现<strong className="text-text-primary">中铁建设</strong>近期浏览了轴承类目32次，结合历史采购周期预测，本周有<strong className="text-accent">87%概率</strong>启动采购。建议您今天优先跟进。
          <span className="inline-flex gap-1 ml-2">
            <span className="typing-dot"></span>
            <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
            <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
          </span>
        </div>
      </div>

      {/* Insights Section */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            📅 今日拜访计划
            <span className="bg-primary text-[10px] px-2 py-0.5 rounded-full font-medium">AI 驱动</span>
          </h2>
        </div>
        <div className="bg-bg-card border border-white/5 rounded-[20px] p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-[#8b5cf6] rounded-xl flex items-center justify-center text-white font-bold">中铁</div>
              <div>
                <div className="text-[15px] font-semibold">中铁建设集团</div>
                <div className="text-xs text-text-muted">预计 15:00 · 北京市朝阳区</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('visit-ai')}
              className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-semibold"
            >
              开始拜访
            </button>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-accent bg-accent/10 p-2 rounded-lg">
            <Sparkles size={12} />
            <span>Agent 已为您生成访前简报，点击“开始拜访”查看</span>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            🎯 Agent发现
            <span className="bg-danger text-[10px] px-2 py-0.5 rounded-full font-medium">3 NEW</span>
          </h2>
        </div>

        <div className="space-y-3">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={`relative overflow-hidden p-[18px] rounded-[20px] bg-bg-card border border-white/5 ${
                insight.type === 'urgent' ? 'border-danger/30 bg-linear-to-br from-bg-card to-danger/10' : 'border-success/30 bg-linear-to-br from-bg-card to-success/10'
              }`}
            >
              <div className={`absolute top-0 right-0 text-[10px] px-3.5 py-1.5 rounded-bl-xl font-semibold ${
                insight.type === 'urgent' ? 'bg-danger' : 'bg-success'
              }`}>
                {insight.priorityLabel}
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl mb-3">
                {insight.icon}
              </div>
              <h3 className="text-[15px] font-semibold mb-1.5">{insight.title}</h3>
              <p className="text-[13px] text-text-secondary leading-normal mb-3.5">{insight.description}</p>
              <div className="text-xs text-text-muted mb-3.5">{insight.meta}</div>
              <div className="flex gap-2.5">
                <button 
                  onClick={() => onNavigate('customer')}
                  className="flex-1 py-3 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl text-sm font-semibold"
                >
                  立即跟进
                </button>
                <button className="flex-1 py-3 bg-bg-elevated text-text-primary rounded-xl text-sm font-semibold">
                  Agent代拨
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auto Exec Section */}
      <section className="px-4">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">⚡ Agent自动执行中</h2>
        <div className="p-[18px] bg-linear-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px]">
          <div className="flex items-center gap-3 mb-3.5">
            <span className="bg-accent text-bg-dark text-[11px] px-2.5 py-1 rounded-lg font-bold">托管任务</span>
            <span className="text-[15px] font-semibold">批量客户触达</span>
          </div>
          <div className="mb-3">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-linear-to-r from-accent to-primary rounded-full" style={{ width: '73%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-text-secondary">
              <span>已完成 22/30 位客户</span>
              <span>73%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-[13px] text-success">
              <span className="w-5 text-center">✓</span>
              <span>发送产品资料 - 18位客户已送达</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-success">
              <span className="w-5 text-center">✓</span>
              <span>预约拜访确认 - 4位客户已确认</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-accent">
              <span className="w-5 text-center animate-spin-slow">◐</span>
              <span>跟进提醒发送中...</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-5 px-6 pb-7.5 bg-linear-to-br from-primary to-[#8b5cf6] rounded-b-[32px] relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[20%] w-50 h-50 bg-white/10 rounded-full"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">下午好，张伟</div>
            <h1 className="text-2xl font-bold">{role === 'sales' ? '销售Agent' : '管理Agent'}为您工作中</h1>
          </div>
          
          {/* Role Toggle */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
              当前身份: {role === 'sales' ? '个人销售' : '团队管理'}
            </div>
            <div className="bg-white/10 p-1 rounded-xl backdrop-blur-md flex gap-1">
              <button 
                onClick={() => setRole('sales')}
                className={`p-2 rounded-lg transition-all ${role === 'sales' ? 'bg-white text-primary shadow-lg' : 'text-white/70 hover:text-white'}`}
              >
                <User size={18} />
              </button>
              <button 
                onClick={() => setRole('manager')}
                className={`p-2 rounded-lg transition-all ${role === 'manager' ? 'bg-white text-primary shadow-lg' : 'text-white/70 hover:text-white'}`}
              >
                <Users size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-[13px] backdrop-blur-md">
          <span className="pulse-dot"></span>
          <span>正在分析 {role === 'sales' ? '28 位客户数据...' : '团队 12 名成员表现...'}</span>
        </div>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait">
          {role === 'sales' ? renderSalesContent() : <ManagerDashboard onNavigate={onNavigate} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
