import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, DollarSign, Wrench, Target, ChevronRight, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface SkillsProps {
  onNavigate: (page: PageId) => void;
}

export default function Skills({ onNavigate }: SkillsProps) {
  const categories = [
    { icon: MessageSquare, name: '高转化沟通话术', meta: '52个场景 · 本周调用 128次' },
    { icon: DollarSign, name: '报价谈判策略', meta: '38个策略 · 本周调用 86次' },
    { icon: Wrench, name: 'MRO专业知识库', meta: '2800条 · 本周调用 256次' },
    { icon: Target, name: '临门一脚技巧', meta: '28个技巧 · 本周调用 45次' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="pt-5 px-4 text-center">
        <h1 className="text-[22px] font-bold mb-2">🧠 Skills 技能库</h1>
        <p className="text-sm text-text-secondary">顶尖销售经验，一键调用</p>
      </div>

      <div className="flex justify-center gap-8 p-5 mx-4 bg-bg-card rounded-[20px]">
        {[
          { value: '156', label: '已沉淀技能' },
          { value: '89%', label: '团队使用率' },
          { value: '+35%', label: '效率提升' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-[28px] font-bold text-accent">{stat.value}</div>
            <div className="text-[12px] text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3 px-4">
        {categories.map((cat, i) => (
          <div key={i} className="bg-bg-card rounded-[18px] p-4 flex items-center gap-3.5 border border-white/5">
            <div className="w-[50px] h-[50px] bg-linear-to-br from-primary to-[#8b5cf6] rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
              <cat.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold mb-1">{cat.name}</div>
              <div className="text-[12px] text-text-muted">{cat.meta}</div>
            </div>
            <ChevronRight size={18} className="text-text-muted" />
          </div>
        ))}

        <button 
          onClick={() => onNavigate('extract')}
          className="w-full bg-transparent border-2 border-dashed border-primary/50 rounded-[18px] p-4 flex items-center gap-3.5 group hover:bg-primary/5 transition-colors"
        >
          <div className="w-[50px] h-[50px] border-2 border-dashed border-primary rounded-2xl flex items-center justify-center text-2xl text-primary">
            <Sparkles size={24} />
          </div>
          <div className="flex-1 text-left">
            <div className="text-[15px] font-semibold mb-1 text-primary">沉淀我的经验</div>
            <div className="text-[12px] text-text-muted">把实战经验变成可复用技能</div>
          </div>
          <ChevronRight size={18} className="text-text-muted" />
        </button>
      </div>
    </motion.div>
  );
}
