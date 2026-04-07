import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, User, AlertTriangle, Brain, ShoppingCart, Target, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface Customer360Props {
  onNavigate: (page: PageId) => void;
}

export default function Customer360({ onNavigate }: Customer360Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="pt-5 px-4 text-center">
        <div className="w-[72px] h-[72px] bg-linear-to-br from-[#1e40af] to-[#3b82f6] rounded-[20px] flex items-center justify-center text-[28px] font-bold mx-auto mb-3 text-white">中铁</div>
        <h1 className="text-xl font-bold mb-2">中铁建设集团</h1>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="text-xs px-3 py-1 rounded-full bg-linear-to-br from-[#fbbf24] to-[#f59e0b] text-[#78350f] font-medium">⭐ 头部大客户</span>
          <span className="text-xs px-3 py-1 rounded-full bg-bg-elevated">基建工程</span>
          <span className="text-xs px-3 py-1 rounded-full bg-bg-elevated">北京</span>
        </div>
      </div>

      {/* AI Analysis Panel */}
      <div className="mx-4 bg-bg-card rounded-[20px] overflow-hidden">
        <div className="bg-linear-to-br from-primary to-[#8b5cf6] px-[18px] py-3.5 flex items-center gap-2.5">
          <span>🤖</span>
          <span className="font-semibold">Agent 360°智能诊断</span>
        </div>
        <div className="p-[18px] space-y-4">
          {[
            { icon: DollarSign, label: '年采购潜力', value: '¥2,800万 / 年', highlight: true },
            { icon: TrendingUp, label: '增长空间', value: '轴承品类可提升 40%' },
            { icon: User, label: '关键决策人', value: '李总监 (采购总监) - 关系良好' },
            { icon: AlertTriangle, label: '风险提示', value: '竞对正在接触，需加快节奏', warning: true },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-base shrink-0">
                <item.icon size={16} className={item.warning ? 'text-warning' : 'text-primary'} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-text-muted mb-0.5">{item.label}</div>
                <div className={`text-sm font-medium ${item.highlight ? 'text-accent' : item.warning ? 'text-warning' : ''}`}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Card */}
      <div className="mx-4 bg-bg-card rounded-[20px] p-[18px]">
        <div className="flex justify-between items-center mb-3.5">
          <div className="text-sm font-semibold">🎯 Agent商机预测</div>
          <div className="text-2xl font-bold text-success">87%</div>
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed">
          预测该客户将在 <strong className="text-text-primary">4月10日-15日</strong> 期间启动轴承年度采购，预计金额 <strong className="text-accent">¥120万</strong>。建议本周完成首次商务拜访。
        </p>
      </div>

      {/* Product Pool Insight Card */}
      <div 
        onClick={() => onNavigate('product-pool')}
        className="mx-4 bg-linear-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-[20px] p-[18px] cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary" />
            <span className="text-sm font-bold">Agent 商品池洞察</span>
          </div>
          <div className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">需求诊断</div>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-bg-card/50 rounded-xl border border-white/5">
            <div className="text-xs text-text-secondary leading-relaxed space-y-3">
              <p><span className="text-danger font-bold">诊断结论：</span>漏斗流失主要在入池(25.0%)与动销(8.7%)环节，货盘承接能力存断点。</p>
              
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">建议跟进行动：</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                    <Target size={12} className="text-primary" />
                    <span className="text-[11px] font-bold text-primary">高意向 SKU 跟进</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-accent/10 border border-accent/20 rounded-lg">
                    <ShoppingCart size={12} className="text-accent" />
                    <span className="text-[11px] font-bold text-accent">入池 SKU 推荐</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-success/10 border border-success/20 rounded-lg">
                    <TrendingUp size={12} className="text-success" />
                    <span className="text-[11px] font-bold text-success">同业精准拓品</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-primary font-bold">
            <span>查看完整诊断报告与行动指南</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      <div className="px-4">
        <button 
          onClick={() => onNavigate('chat')}
          className="w-full py-4 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          🤖 让Agent帮我制定跟进策略
        </button>
      </div>

      {/* Skill Recommendations */}
      <section className="mx-4 p-[18px] bg-linear-to-br from-primary/10 to-[#8b5cf6]/5 border border-primary/20 rounded-[20px]">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xl">🧠</span>
          <span className="text-base font-bold">Agent推荐Skills</span>
          <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-lg font-semibold">智能匹配</span>
        </div>
        <p className="text-xs text-text-secondary mb-3.5">基于当前客户状态，Agent为您推荐以下可复用Skills：</p>
        
        <div className="space-y-3">
          {[
            { 
              type: '💬 沟通话术', 
              match: '95%', 
              title: '大客户决策人破冰术', 
              trigger: '⚡ 触发：头部大客户 + 需求确认阶段 + 联系决策人',
              content: '"李总，我注意到中铁建设近期在城际铁路项目上有很大突破，我们在MRO供应链上或许能帮您进一步降本增效..."',
              tips: '💡 拜访前查阅客户近期新闻，找到具体可誉点',
              source: '来源：张伟（Top Sales）· 成功率 78%'
            },
            { 
              type: '💰 报价策略', 
              match: '82%', 
              title: '阶梯式报价锚定法', 
              trigger: '⚡ 触发：方案报价阶段 + 预计金额>50万',
              content: '先报标准价建立锚点，再展示阶梯优惠，让客户感受到"争取来的优惠"',
              source: '来源：李明 · 提升转化率30%'
            }
          ].map((skill, i) => (
            <div key={i} className="bg-bg-card rounded-xl p-3.5 border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-primary">{skill.type}</span>
                <span className="text-[11px] px-2 py-0.5 bg-success/20 text-success rounded-md font-semibold">匹配度 {skill.match}</span>
              </div>
              <h3 className="text-[15px] font-semibold mb-2">{skill.title}</h3>
              <div className="text-[11px] text-warning mb-2.5 px-2.5 py-1.5 bg-warning/10 rounded-md">
                {skill.trigger}
              </div>
              <div className="text-[13px] text-text-secondary leading-relaxed p-2.5 bg-bg-elevated rounded-lg border-l-3 border-primary mb-2.5">
                {skill.content}
              </div>
              {skill.tips && <div className="text-xs text-accent mb-2">{skill.tips}</div>}
              <div className="text-[11px] text-text-muted mb-3">{skill.source}</div>
              <button 
                onClick={() => onNavigate('chat')}
                className="w-full py-2.5 bg-primary text-white rounded-lg text-[13px] font-medium"
              >
                一键应用此Skill
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
