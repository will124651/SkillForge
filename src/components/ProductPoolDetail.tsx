import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Target, 
  ShoppingCart, 
  Search, 
  FileText, 
  Box,
  ShieldCheck,
  Wrench,
  Zap,
  Info,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend
} from 'recharts';
import { PageId } from '../types';

interface ProductPoolDetailProps {
  onNavigate: (page: PageId) => void;
}

const COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', 
  '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#cbd5e1'
];

const categoryData = [
  { name: '密封件', value: 29376 },
  { name: '泵阀管路', value: 27725 },
  { name: '紧固件', value: 22055 },
  { name: '电气', value: 14332 },
  { name: '办公用品', value: 2497 },
  { name: '实验室耗材', value: 3294 },
  { name: '电缆光缆', value: 8818 },
  { name: '手工具', value: 4916 },
  { name: '胶带及标签', value: 1325 },
  { name: '工控', value: 3906 },
  { name: '其他', value: 57395 },
];

const channelData = [
  { name: '询报价', count: 14198, skuRate: '53.7%', poolRate: '68%', salesRate: '28.8%' },
  { name: '大清单匹配', count: 133, skuRate: '28.6%', poolRate: '54%', salesRate: '10.0%' },
  { name: 'BD清单梳理', count: 102224, skuRate: '8.3%', poolRate: '93%', salesRate: '14.0%' },
  { name: 'AI物料管家', count: 15137, skuRate: '89.4%', poolRate: '18%', salesRate: '2.0%' },
  { name: '常采清单', count: 699600, skuRate: '64.0%', poolRate: '22%', salesRate: '5.0%' },
  { name: '搜索', count: 13467, skuRate: '55.3%', poolRate: '57%', salesRate: '35.2%' },
];

const skuData = [
  { cat: '实验室耗材', brand: 'SHUANGQUAN/双圈', name: '定量滤纸', code: 'AA4156186', rank: 1 },
  { cat: '实验室耗材', brand: 'LEIGU/垒固', name: '洗耳球', code: 'AE1896986', rank: 2 },
  { cat: '办公用品', brand: 'PANASONIC/松下', name: '碱性电池', code: 'AF0284747', rank: 1 },
  { cat: '办公用品', brand: 'TP-LINK/普联', name: '五类非屏蔽网线', code: 'AA3279277', rank: 2 },
  { cat: '胶带及标签', brand: '3M', name: 'PVC电气绝缘胶带', code: 'AF0055570', rank: 1 },
  { cat: '胶带及标签', brand: '3M', name: 'PVC电气绝缘胶带-阻燃型', code: 'AF0101482', rank: 2 },
];

export default function ProductPoolDetail({ onNavigate }: ProductPoolDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-dark pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-3">
        <button onClick={() => onNavigate('customer')} className="p-2 -ml-2 text-text-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">中铁建设集团需求诊断报告</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Core Conclusion */}
        <section className="bg-linear-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-2xl p-5">
          <h2 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
            <Zap size={18} /> 核心结论
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            <strong className="text-text-primary">诊断结论：</strong>客户整体需求漏斗转化流失主要在入池(25.0%)与动销(8.7%)环节，其中“AI物料管家”及“常采清单”存在较大优化空间。
          </p>
          
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-primary">可跟进行为：</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-bg-card/50 p-3 rounded-xl border border-white/5">
                <div className="text-[11px] font-bold text-primary mb-1">① 高意向SKU跟进（提升动销率）</div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  “搜索”及“询报价”渠道中已入池但未动销的5千个高意向SKU，生成推荐清单定向推送。
                </p>
              </div>
              <div className="bg-bg-card/50 p-3 rounded-xl border border-white/5">
                <div className="text-[11px] font-bold text-primary mb-1">② 商品池入池SKU推荐（提升入池率）</div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  高需求量且高动销率品类（实验室耗材/办公用品/胶带及标签）可入商品池SKU推荐。
                </p>
              </div>
              <div className="bg-bg-card/50 p-3 rounded-xl border border-white/5">
                <div className="text-[11px] font-bold text-primary mb-1">③ 同业客户精准拓品推荐（机会挖掘）</div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  以宁波中铁建设为标杆，向辽宁/广州中铁建设交叉推销。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Funnel Diagnosis */}
        <section className="bg-bg-card border border-white/5 rounded-2xl p-5">
          <h2 className="text-base font-bold mb-4">客户需求漏斗诊断</h2>
          
          {/* Action Guide Box */}
          <div className="mb-6 bg-linear-to-br from-danger/10 to-warning/5 border border-danger/20 rounded-xl p-4">
            <h3 className="text-xs font-bold text-danger mb-3 flex items-center gap-2">
              <Info size={14} /> 核心洞察与行动指南
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-danger/20 text-danger rounded flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  <span className="font-bold text-text-primary">全局漏斗流失严重：</span> 货盘承接能力不足，整体转化在<span className="text-danger font-bold">入池(25.0%)</span>与<span className="text-danger font-bold">动销(8.7%)</span>环节较低。
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-warning/20 text-warning rounded flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  <span className="font-bold text-text-primary">特定渠道入池率低：</span> “AI物料管家”识别高达<span className="text-warning font-bold">89.4%</span>但入池仅<span className="text-warning font-bold">18%</span>。
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-white/5">
                <div className="text-[10px] font-bold text-success mb-1 flex items-center gap-1">
                  <Target size={12} /> 销售最紧迫动作
                </div>
                <p className="text-[10px] text-text-secondary">
                  针对已入池但未动销的<span className="text-success font-bold">5千个高意向SKU</span>，生成“首单立减”或平替清单定向推送。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Funnel Chart */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-text-muted mb-2">全局漏斗诊断</h3>
              <div className="w-full bg-blue-500 py-3 rounded-t-xl flex flex-col items-center border border-blue-400 shadow-lg">
                <span className="text-[10px] text-white/80">总需求量</span>
                <span className="text-lg font-bold text-white">84.4万</span>
              </div>
              <div className="w-[85%] mx-auto bg-blue-600 py-3 flex flex-col items-center border border-blue-500 shadow-md">
                <span className="text-[10px] text-white/80">识别率</span>
                <span className="text-lg font-bold text-white">57.4%</span>
              </div>
              <div className="w-[70%] mx-auto bg-blue-700 py-3 flex flex-col items-center border border-blue-600 shadow-sm">
                <span className="text-[10px] text-white/80">入池率</span>
                <span className="text-lg font-bold text-white">25.0%</span>
              </div>
              <div className="w-[55%] mx-auto bg-blue-800 py-3 rounded-b-xl flex flex-col items-center border border-blue-700">
                <span className="text-[10px] text-white/80">动销率</span>
                <span className="text-lg font-bold text-white">8.7%</span>
              </div>
            </div>

            {/* Channel Table */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-text-muted mb-2">需求来源/渠道剖析</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] text-left">
                  <thead>
                    <tr className="text-text-muted border-b border-white/5">
                      <th className="pb-2 font-medium">需求来源</th>
                      <th className="pb-2 text-right font-medium">识别率</th>
                      <th className="pb-2 text-right font-medium">入池率</th>
                      <th className="pb-2 text-right font-medium">动销率</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {channelData.map((item, i) => (
                      <tr key={i}>
                        <td className="py-2 font-medium">{item.name}</td>
                        <td className="py-2 text-right">{item.skuRate}</td>
                        <td className={`py-2 text-right ${parseFloat(item.poolRate) < 20 ? 'text-warning font-bold' : ''}`}>{item.poolRate}</td>
                        <td className={`py-2 text-right font-bold ${parseFloat(item.salesRate) > 25 ? 'text-success' : ''}`}>
                          {item.salesRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Category & SKU Recommendation */}
        <section className="bg-bg-card border border-white/5 rounded-2xl p-5">
          <h2 className="text-base font-bold mb-4">高需求&高动销品类入池推荐</h2>
          
          <div className="h-72 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <h3 className="text-xs font-bold text-primary mb-3 flex items-center gap-2">
              <Zap size={14} /> TOP3 高动销品类诊断
            </h3>
            <div className="space-y-2">
              {['实验室耗材', '办公用品', '胶带及标签'].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-bg-card rounded-lg border border-white/5">
                  <span className="text-[11px] font-bold">{cat}</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-primary/20 text-primary rounded">高频消耗</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xs font-bold text-text-muted mb-3">商品池可推 SKU 推荐</h3>
          <div className="space-y-2">
            {skuData.map((sku, i) => (
              <div key={i} className="p-3 bg-bg-elevated rounded-xl border border-white/5 flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-primary font-bold">{sku.cat}</span>
                    <span className="text-[9px] text-text-muted">| {sku.brand}</span>
                  </div>
                  <div className="text-xs font-bold">{sku.name}</div>
                  <div className="text-[9px] text-text-muted font-mono">{sku.code}</div>
                </div>
                <div className="w-5 h-5 bg-text-primary text-bg-dark rounded-full flex items-center justify-center text-[9px] font-bold shrink-0">
                  {sku.rank}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-sell Analysis */}
        <section className="bg-bg-card border border-white/5 rounded-2xl p-5">
          <h2 className="text-base font-bold mb-4">同业客户交叉分析</h2>
          
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <div className="text-[9px] text-accent font-bold mb-1 uppercase tracking-wider">⭐ 行业标杆</div>
              <div className="text-sm font-bold mb-1">宁波中铁建设新材料</div>
              <div className="text-xl font-bold text-accent mb-2">34 <span className="text-xs font-normal text-text-muted">个购买品类</span></div>
              <p className="text-[10px] text-text-secondary">全面覆盖核心工业品，基础生产物料闭环。</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-bg-elevated border border-white/5 rounded-xl">
                <div className="text-[9px] text-warning font-bold mb-1">⚠️ 严重偏科</div>
                <div className="text-xs font-bold mb-1">辽宁中铁建设生物</div>
                <div className="text-lg font-bold">1 <span className="text-[10px] font-normal text-text-muted">品类</span></div>
              </div>
              <div className="p-3 bg-bg-elevated border border-white/5 rounded-xl">
                <div className="text-[9px] text-warning font-bold mb-1">⚠️ 单点突破</div>
                <div className="text-xs font-bold mb-1">广州中铁建设碳纤</div>
                <div className="text-lg font-bold">2 <span className="text-[10px] font-normal text-text-muted">品类</span></div>
              </div>
            </div>
          </div>

          <div className="bg-bg-elevated border border-white/5 rounded-xl p-4">
            <h3 className="text-xs font-bold mb-3 flex items-center gap-2">
              <Target size={14} className="text-primary" /> 同行交叉拓品执行清单
            </h3>
            <div className="space-y-4">
              {[
                { title: '个人防护类', items: ['3M (头部标配)', '霍尼韦尔'], icon: ShieldCheck },
                { title: '手工具类', items: ['世达 (高品质)', '震坤行 (性价比)'], icon: Wrench },
                { title: '电缆光缆类', items: ['起帆', '远东'], icon: Zap },
              ].map((group, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <group.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-0.5">{group.title}</div>
                    <div className="text-[10px] text-text-secondary leading-relaxed">{group.items.join(' / ')}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-bg-dark rounded-lg border border-white/5">
              <div className="text-[10px] text-accent font-bold mb-1">销售话术建议：</div>
              <p className="text-[10px] text-text-muted leading-relaxed italic">
                “王总，宁波中铁建设工厂一直在稳定采购3M劳保和世达工具。考虑到辽宁基地检修，我为您匹配了同款畅销包，可享集团协议价...”
              </p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
