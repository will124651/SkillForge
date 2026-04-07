import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Activity, 
  AlertCircle, 
  ChevronRight, 
  BarChart3, 
  PieChart, 
  Zap,
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { PageId } from '../types';

interface ManagerDashboardProps {
  onNavigate: (page: PageId) => void;
}

export default function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 pb-8"
    >
      {/* 1. 行为管理 */}
      <section className="px-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-primary" /> 行为管理
          </h2>
          <span className="text-xs text-text-muted">本周数据</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-card border border-white/5 rounded-2xl p-4 space-y-2">
            <div className="text-xs text-text-muted">跟进覆盖率</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-text-primary">86%</span>
              <span className="text-[10px] text-success mb-1 flex items-center">
                <ArrowUpRight size={10} /> +4%
              </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '86%' }}></div>
            </div>
          </div>
          
          <div className="bg-bg-card border border-white/5 rounded-2xl p-4 space-y-2">
            <div className="text-xs text-text-muted">管理Agent 行为质量分</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-accent">8.4</span>
              <span className="text-[10px] text-text-muted mb-1">/ 10</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-accent' : 'bg-white/10'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-bg-card border border-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">团队执行力洞察</div>
            <Zap size={14} className="text-warning" />
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl border-l-2 border-primary">
              <div className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary">高质动作：</strong> 销售 A 在“中铁建设”的方案演示中，管理Agent 识别到其对“全生命周期成本”的阐述极具说服力，建议作为标杆话术沉淀。
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-xl border-l-2 border-warning">
              <div className="text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary">覆盖预警：</strong> 华东区 15% 的 A 类客户已超过 7 天未触达，建议介入督办。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pipeline 管道管理 */}
      <section className="px-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BarChart3 size={20} className="text-accent" /> Pipeline 管道管理
          </h2>
          <button className="text-xs text-primary font-medium">查看漏斗</button>
        </div>

        <div className="bg-bg-card border border-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex justify-around items-center py-2">
            <div className="text-center">
              <div className="text-xs text-text-muted mb-1">线索 → 方案</div>
              <div className="text-lg font-bold">32%</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <div className="text-xs text-text-muted mb-1">方案 → 签约</div>
              <div className="text-lg font-bold">18%</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <div className="text-xs text-text-muted mb-1">平均周期</div>
              <div className="text-lg font-bold">24天</div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Clock size={14} className="text-warning" /> 停滞节点预警
              </div>
              <span className="text-[10px] bg-warning/20 text-warning px-2 py-0.5 rounded-full font-medium">4 个项目</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl">
                <div>
                  <div className="text-sm font-medium">华为技术 - 5G 模块采购</div>
                  <div className="text-[10px] text-text-muted">停滞于 [方案确认] 阶段 12 天</div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={14} className="text-danger" /> 风险商机识别
              </div>
              <span className="text-[10px] bg-danger/20 text-danger px-2 py-0.5 rounded-full font-medium">管理Agent 预测</span>
            </div>
            <div className="p-3 bg-danger/5 border border-danger/20 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-sm font-medium">三一重工 - 数字化改造项目</div>
                <div className="text-xs text-danger font-bold">流失风险 75%</div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                <span className="text-danger font-bold">风险点：</span> 决策链发生变动，且竞对近期频繁接触其采购部。建议立即申请高层对等拜访。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 预测与资源配置 */}
      <section className="px-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <PieChart size={20} className="text-success" /> 预测与资源配置
          </h2>
        </div>

        <div className="bg-linear-to-br from-[#10b981]/20 to-[#059669]/10 border border-success/30 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs text-success font-bold mb-1 uppercase tracking-wider">本月收入预测</div>
              <div className="text-3xl font-bold text-text-primary">¥1,240.5 万</div>
            </div>
            <div className="bg-success text-white text-[10px] px-2 py-1 rounded-lg font-bold">
              达成率 82%
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-[10px] text-text-muted mb-1">确定性收入</div>
              <div className="text-sm font-bold">¥850万</div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-text-muted mb-1">加权预测</div>
              <div className="text-sm font-bold">¥390.5万</div>
            </div>
          </div>
        </div>

        <div className="bg-bg-card border border-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold flex items-center gap-2">
              <Target size={14} className="text-primary" /> 高潜客户识别
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: '中铁建设', potential: '¥450万', reason: '采购窗口期 + 历史高转化', tag: '重点攻坚' },
              { name: '格力电器', potential: '¥280万', reason: '新品类拓展信号强', tag: '高成长' },
            ].map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl border border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{customer.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-primary/20 text-primary rounded font-bold">{customer.tag}</span>
                  </div>
                  <div className="text-[10px] text-text-muted">{customer.reason}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">{customer.potential}</div>
                  <div className="text-[9px] text-text-muted">预估价值</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-bg-elevated text-text-primary rounded-xl text-xs font-bold border border-white/5">
            查看完整高潜名单
          </button>
        </div>
      </section>
    </motion.div>
  );
}
