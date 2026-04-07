import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, Brain, CheckCircle2, Loader2, Sparkles, Save, Database, Wrench, Globe, UserCheck, MapPin, PhoneCall, ChevronRight, AlertTriangle } from 'lucide-react';
import { PageId, Skill } from '../types';

interface ExtractProps {
  onNavigate: (page: PageId) => void;
}

const SIMULATED_SKILLS: Skill[] = [
  {
    id: 'skill_1',
    type: '客户开发',
    title: 'Customer_Contact_Discovery (客户关键人联系方式智能获取)',
    description: '模拟资深销售的搜客逻辑，通过多渠道交叉检索（公开网络、商业数据库、社媒、内部系统），挖掘目标客户的关键决策人姓名及有效电话，并生成高接通率的破冰话术。',
    preview: '挖掘目标客户（如采购部）的关键决策人姓名及有效电话，并生成高接通率的破冰话术。',
    tags: ['线索挖掘', '关键人定位', '信息查询'],
    scenario: '当Agent需要触达某个目标企业，但缺乏具体联系人信息时触发。',
    trigger: {
      signal: '缺乏联系人信息',
      customer_type: '目标企业',
      stage: '线索开发'
    },
    inputs: ['target_company: 目标企业名称', 'target_department: 目标部门（默认为“采购部”）'],
    workflow: {
      title: '⚙️ 技能执行逻辑 (Execution Workflow)',
      steps: [
        {
          name: 'Sub-task 1: 关键人姓名挖掘 (Extract_Key_Person_Name)',
          action: '调度不同的检索工具进行广度搜索。如果获取到姓名，则电话转接成功率和系统评分将大幅提升。',
          tools: ['Web Scraper (网页抓取)', 'API 接口 (天眼查/脉脉/招投标库)', 'RAG/大模型直搜', '内部数据库查询']
        },
        {
          name: 'Sub-task 2: 电话号码匹配与验证 (Match_Phone_Number)',
          action: '将 Sub-task 1 中获取的“客户姓名”作为联合主键，与企业信息进行二次检索，寻找联系方式。',
          tools: ['公开/商业数据提取', 'AI 直询', 'CRM 系统集成']
        }
      ]
    },
    isExecutable: true
  },
  {
    id: 'skill_2',
    type: '场景化邀约',
    title: 'Contextual_Doorstep_Invitation (场景化临门邀约话术生成)',
    description: '根据销售人员当前的地理位置（LBS）和目标客户信息，动态抽取 CRM 系统中的“附近已合作客户”和“同行业标杆客户”数据，自动生成一套高转化率的低压迫感电话邀约话术。',
    preview: '自动生成一套高转化率（目标 50%）的低压迫感电话邀约话术，并提供语音语调的执行指导。',
    tags: ['LBS', '场景化邀约', '高转化'],
    scenario: '当销售人员物理位置接近目标客户公司（如距离小于 500 米），且已获取关键决策人电话时触发。',
    trigger: {
      signal: '距离小于 500 米',
      customer_type: '目标企业',
      stage: '临门邀约'
    },
    inputs: ['target_person_name: 目标关键人姓名', 'sales_company: 销售方公司名', 'target_industry: 目标客户所在行业'],
    workflow: {
      title: '⚙️ 技能执行逻辑 (Execution Workflow)',
      steps: [
        {
          name: 'Sub-task 1: 上下文数据动态检索 (Retrieve_Contextual_Data)',
          action: '基于当前的输入参数，从内部知识库和 CRM 系统中调取用于“套近乎”和“背书”的素材。',
          tools: ['地理位置匹配 (LBS)', '行业案例匹配 (RAG)', '职位自适应包装']
        },
        {
          name: 'Sub-task 2: 话术组装与策略注入 (Synthesize_Script)',
          action: '将检索到的信息嵌入到经过验证的心理学转化模型中。',
          tools: ['高位开场', '实力背书', '消除防备', '引发兴趣', '低压邀约']
        }
      ]
    },
    isExecutable: true
  }
];

export default function Extract({ onNavigate }: ExtractProps) {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [analysisSteps, setAnalysisSteps] = useState([
    { label: '读取文档内容', status: 'pending' as 'pending' | 'active' | 'done' },
    { label: '识别销售场景', status: 'pending' as 'pending' | 'active' | 'done' },
    { label: '提取关键技巧', status: 'pending' as 'pending' | 'active' | 'done' },
    { label: '生成标准化Skills', status: 'pending' as 'pending' | 'active' | 'done' },
  ]);
  const [source, setSource] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New state for skill execution
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isExecutingSkill, setIsExecutingSkill] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([
    { label: '关键人姓名挖掘', status: 'pending' as 'pending' | 'active' | 'done', tools: ['脉脉', '天眼查', '招投标库'] },
    { label: '电话号码匹配与验证', status: 'pending' as 'pending' | 'active' | 'done', tools: ['官网', 'CRM撞库', 'AI直询'] },
  ]);
  const [executionResult, setExecutionResult] = useState<any | null>(null);
  const [showConflictResolution, setShowConflictResolution] = useState(false);
  const [conflictingData, setConflictingData] = useState<any[]>([]);

  const simulateAnalysis = async (fileName: string) => {
    setSource(fileName);
    setStep('analyzing');
    
    const steps = [...analysisSteps];
    for (let i = 0; i < steps.length; i++) {
      // Set current step to active
      steps[i].status = 'active';
      setAnalysisSteps([...steps]);
      
      // Wait 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set current step to done
      steps[i].status = 'done';
      setAnalysisSteps([...steps]);
    }

    // Final wait before showing results
    await new Promise(resolve => setTimeout(resolve, 500));
    setStep('result');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateAnalysis(file.name);
    }
  };

  const handleDemo = () => {
    simulateAnalysis('中铁建设大客户签约复盘.pdf');
  };

  const resetExtract = () => {
    setStep('upload');
    setAnalysisSteps(analysisSteps.map(s => ({ ...s, status: 'pending' })));
  };

  const stepDetails = [
    "正在检索官网及招聘网站，定位采购部关键岗位...",
    "正在穿透脉脉及抖音，获取决策人社交画像及活跃度...",
    "发现多平台数据存在差异，需要人工校验以确保 Skill 沉淀质量...",
    "正在通过 CRM 撞库及 AI 模拟直询验证电话可用性..."
  ];

  const handleSelectCompany = async (companyName: string) => {
    setSelectedCompany(companyName);
    setShowCompanyList(false);
    setIsExecutingSkill(true);
    setExecutionResult(null);
    setShowConflictResolution(false);
    
    // Reset execution steps with multi-platform logic
    const steps: { label: string; status: 'pending' | 'active' | 'done'; tools: string[] }[] = [
      { label: '全网多维度信息检索', status: 'pending', tools: ['官网', '天眼查', '招投标库', '招聘网站'] },
      { label: '社交媒体与社盟数据穿透', status: 'pending', tools: ['脉脉', '抖音', '公众号'] },
      { label: '多源数据冲突校验与交叉验证', status: 'pending', tools: ['AI 推理', '逻辑校验'] },
      { label: '联系方式精准匹配与可用性验证', status: 'pending', tools: ['CRM 撞库', 'AI 直询'] },
    ];
    setExecutionSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      steps[i].status = 'active';
      setExecutionSteps([...steps]);
      
      if (i === 2) {
        // Trigger conflict resolution
        await new Promise(resolve => setTimeout(resolve, 2000));
        setConflictingData([
          { id: 1, source: '天眼查', name: '李志强', title: '采购部总监', phone: '138-xxxx-8888', confidence: '高', updateTime: '2024-03' },
          { id: 2, source: '脉脉', name: '李志强', title: '供应链副总裁', phone: '139-xxxx-9999', confidence: '中', updateTime: '2024-01' },
          { id: 3, source: '官网招聘', name: '李强', title: '采购经理', phone: '010-xxxx-1234', confidence: '低', updateTime: '2023-11' },
        ]);
        setShowConflictResolution(true);
        return; // Pause execution here
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      steps[i].status = 'done';
      setExecutionSteps([...steps]);
    }
  };

  const finishExecution = async (selectedSource: any) => {
    setShowConflictResolution(false);
    const steps = [...executionSteps];
    // Mark the 3rd step as done
    steps[2].status = 'done';
    setExecutionSteps([...steps]);
    
    // Run the last step
    steps[3].status = 'active';
    setExecutionSteps([...steps]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    steps[3].status = 'done';
    setExecutionSteps([...steps]);

    setExecutionResult({
      name: selectedSource.name,
      title: selectedSource.title,
      phone: selectedSource.phone,
      script: `李总您好，我是震坤行的，了解到${selectedCompany}近期在MRO供应链降本增效方面有新的规划，我们之前和同行业的标杆企业有很多成功合作案例，想跟您交流一下...`
    });
  };

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-white/5">
        <button onClick={() => onNavigate('skills')} className="text-primary">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">沉淀我的经验</h2>
      </div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="text-5xl">🧠</div>
              <h3 className="text-xl font-bold">AI智能提取Skills</h3>
              <p className="text-sm text-text-secondary leading-relaxed px-6">
                上传你的优秀案例材料，Agent将自动分析并提取可复用的销售技能
              </p>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              onChange={handleFileUpload}
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/50 rounded-[20px] py-10 px-5 text-center cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <Upload size={48} className="mx-auto mb-3 text-primary" />
              <span className="block text-base font-semibold mb-2">点击上传案例材料</span>
              <span className="block text-xs text-text-muted">支持 PDF / Word / PPT / 图片</span>
            </div>

            <div className="bg-bg-card rounded-2xl p-4">
              <div className="text-sm font-semibold mb-3">💡 推荐上传内容</div>
              <div className="grid grid-cols-2 gap-2.5">
                {['📊 成功签单复盘PPT', '📝 客户沟通记录', '🎯 销售话术总结', '💰 报价谈判案例'].map((item, i) => (
                  <div key={i} className="text-[13px] text-text-secondary p-2 bg-bg-elevated rounded-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleDemo}
              className="w-full py-4 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl font-semibold shadow-lg"
            >
              📄 使用示例文件演示
            </button>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-10"
          >
            <div className="bg-bg-card rounded-3xl p-10 text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-3 border-transparent border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">🤖</div>
              </div>
              <h3 className="text-lg font-semibold">Agent 正在分析...</h3>
              <div className="text-left space-y-4">
                {analysisSteps.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                    s.status === 'active' ? 'text-accent' : s.status === 'done' ? 'text-success' : 'text-text-muted'
                  }`}>
                    {s.status === 'done' ? <CheckCircle2 size={16} /> : <Loader2 size={16} className={s.status === 'active' ? 'animate-spin' : ''} />}
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-lg font-bold">提取完成！发现 {SIMULATED_SKILLS.length} 个可复用Skills</h3>
              <p className="text-[13px] text-text-muted">来源：《{source}》</p>
            </div>

            <div className="space-y-4">
              {SIMULATED_SKILLS.map((skill, i) => (
                <div key={i} className="bg-bg-card rounded-2xl p-4 border border-primary/20 space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="text-success shrink-0" size={20} />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-primary font-medium">💬 {skill.type}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent rounded-md">⚡ 可执行</span>
                      </div>
                      <h4 className="text-[15px] font-bold">{skill.title}</h4>
                      <p className="text-[13px] text-text-secondary leading-relaxed">{skill.description}</p>
                    </div>
                  </div>

                  {/* Trigger & Inputs */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-bg-elevated/50 p-3 rounded-xl space-y-2">
                      <div className="text-[11px] font-bold text-warning flex items-center gap-1.5">
                        <Sparkles size={12} /> 触发条件 (Trigger)
                      </div>
                      <div className="text-[12px] text-text-secondary">{skill.scenario}</div>
                    </div>
                    <div className="bg-bg-elevated/50 p-3 rounded-xl space-y-2">
                      <div className="text-[11px] font-bold text-accent flex items-center gap-1.5">
                        <Database size={12} /> 输入参数 (Inputs)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.inputs?.map((input, idx) => (
                          <span key={idx} className="text-[11px] text-text-muted">{input}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Workflow */}
                  {skill.workflow && (
                    <div className="space-y-3">
                      <div className="text-[12px] font-bold text-primary flex items-center gap-1.5">
                        <Wrench size={14} /> {skill.workflow.title}
                      </div>
                      <div className="space-y-3">
                        {skill.workflow.steps.map((step, idx) => (
                          <div key={idx} className="bg-bg-elevated p-3 rounded-xl space-y-2 border-l-2 border-primary">
                            <div className="text-[13px] font-semibold text-text-primary">{step.name}</div>
                            <div className="text-[12px] text-text-secondary leading-relaxed">{step.action}</div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {step.tools.map((tool, tIdx) => (
                                <span key={tIdx} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-md border border-primary/20">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag, j) => (
                      <span key={j} className="text-[11px] px-2.5 py-1 bg-primary/20 text-primary rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-3 bg-linear-to-br from-primary to-[#8b5cf6] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                      <Save size={16} /> 保存到库
                    </button>
                    <button 
                      onClick={() => i === 0 ? setShowCompanyList(true) : alert('此技能正在开发中...')}
                      className="flex-1 py-3 bg-bg-elevated text-text-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} /> 立即试用
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2.5 p-3.5 bg-accent/10 rounded-xl text-[13px] text-text-secondary leading-relaxed">
              <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
              <span>可执行型Skill可让Agent代为执行，知识型Skill用于学习参考</span>
            </div>

            <button 
              onClick={resetExtract}
              className="w-full py-3 text-text-muted text-sm"
            >
              继续上传新材料
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Company Selection Modal */}
      <AnimatePresence>
        {showCompanyList && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-[390px] bg-bg-dark rounded-t-[32px] p-6 space-y-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">选择目标客户 (MRO业务)</h3>
                <button onClick={() => setShowCompanyList(false)} className="text-text-muted">关闭</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: '中铁建设集团有限公司', industry: '基建工程', region: '北京' },
                  { name: '三一重工股份有限公司', industry: '工程机械', region: '长沙' },
                  { name: '格力电器股份有限公司', industry: '家电制造', region: '珠海' },
                  { name: '中国建筑第三工程局', industry: '建筑施工', region: '武汉' },
                  { name: '徐工集团工程机械有限公司', industry: '重型机械', region: '徐州' },
                ].map((company, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSelectCompany(company.name)}
                    className="w-full bg-bg-card p-4 rounded-2xl border border-white/5 text-left flex justify-between items-center hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-[15px]">{company.name}</div>
                      <div className="text-xs text-text-muted mt-1">{company.industry} · {company.region}</div>
                    </div>
                    <ChevronRight size={18} className="text-text-muted" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill Execution Modal */}
      <AnimatePresence>
        {isExecutingSkill && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-dark z-[60] flex flex-col"
          >
            <div className="p-4 flex items-center gap-4 border-b border-white/5">
              <button onClick={() => setIsExecutingSkill(false)} className="text-primary">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">Agent 正在执行 Skill</h2>
            </div>

            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              <div className="text-center space-y-2">
                <div className="text-sm text-primary font-medium">正在为以下企业挖掘关键人</div>
                <h3 className="text-xl font-bold">{selectedCompany}</h3>
              </div>

              <div className="space-y-4">
                {executionSteps.map((s, i) => (
                  <div key={i} className={`flex items-start gap-3 text-sm transition-colors duration-300 ${
                    s.status === 'active' ? 'text-accent' : s.status === 'done' ? 'text-success' : 'text-text-muted'
                  }`}>
                    <div className="mt-1">
                      {s.status === 'done' ? <CheckCircle2 size={16} /> : <Loader2 size={16} className={s.status === 'active' ? 'animate-spin' : ''} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{s.label}</div>
                      {s.status === 'active' && (
                        <div className="text-[11px] opacity-80 mt-1 bg-accent/10 p-2 rounded-lg border-l-2 border-accent">
                          {stepDetails[i]}
                        </div>
                      )}
                      {s.status !== 'active' && <div className="text-[10px] opacity-70">涉及平台: {s.tools.join(', ')}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Conflict Resolution UI */}
              <AnimatePresence>
                {showConflictResolution && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-bg-card rounded-2xl p-5 border border-warning/30 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center gap-2 text-warning font-bold">
                      <AlertTriangle size={20} /> 发现多源数据冲突
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Agent 在不同平台检索到不一致的联系人信息。请根据以下来源进行人工校验，选择正确的信息源以沉淀 Skill 逻辑：
                    </p>
                    <div className="space-y-3">
                      {conflictingData.map((data) => (
                        <button 
                          key={data.id}
                          onClick={() => finishExecution(data)}
                          className="w-full p-3 bg-bg-elevated rounded-xl border border-white/5 text-left hover:border-primary/50 transition-all group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                              {data.source}
                            </span>
                            <span className={`text-[10px] font-medium ${
                              data.confidence === '高' ? 'text-success' : data.confidence === '中' ? 'text-warning' : 'text-text-muted'
                            }`}>
                              置信度: {data.confidence}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="font-bold text-sm">{data.name}</div>
                              <div className="text-xs text-text-muted">{data.title}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono text-accent">{data.phone}</div>
                              <div className="text-[9px] text-text-muted mt-1">更新于: {data.updateTime}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="text-[10px] text-text-muted italic text-center">
                      * 您的选择将帮助 Agent 优化该 Skill 的交叉验证算法
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {executionResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-bg-card rounded-2xl p-5 border border-success/30 space-y-4"
                >
                  <div className="flex items-center gap-2 text-success font-bold">
                    <CheckCircle2 size={20} /> 挖掘成功！
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-bg-elevated rounded-xl">
                      <div>
                        <div className="text-xs text-text-muted">关键决策人</div>
                        <div className="font-bold text-lg">{executionResult.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-text-muted">职位</div>
                        <div className="text-sm font-medium">{executionResult.title}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-bg-elevated rounded-xl">
                      <div>
                        <div className="text-xs text-text-muted">联系电话</div>
                        <div className="font-bold text-lg text-accent">{executionResult.phone}</div>
                      </div>
                      <button className="p-2 bg-primary/20 text-primary rounded-lg">
                        <PhoneCall size={18} />
                      </button>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl border-l-3 border-primary">
                      <div className="text-[11px] font-bold text-primary mb-1">破冰话术建议</div>
                      <div className="text-[13px] text-text-secondary leading-relaxed italic">
                        "{executionResult.script}"
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsExecutingSkill(false);
                      setShowCompanyList(false);
                      alert('已将联系人同步至 CRM 跟进计划');
                    }}
                    className="w-full py-3 bg-success text-white rounded-xl font-bold"
                  >
                    同步至 CRM 并开始跟进
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
