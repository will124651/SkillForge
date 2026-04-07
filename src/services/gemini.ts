import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey! });

export async function analyzeCustomer(customerName: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `分析客户 ${customerName} 的商机。请以 JSON 格式返回，包含:
    - signal: 商机信号
    - probability: 成交概率 (0-100)
    - amount: 预计金额
    - suggestions: 建议行动列表`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          signal: { type: Type.STRING },
          probability: { type: Type.NUMBER },
          amount: { type: Type.STRING },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["signal", "probability", "amount", "suggestions"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}

export async function chatWithAgent(message: string, history: { role: string, content: string }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "你是一个专业的MRO销售Agent，具备自主分析、智能决策、任务执行能力。你的目标是帮助销售人员提高效率，发现商机，并提供专业的跟进建议。你可以生成方案、报价单、分析客户。回复要专业、简洁、有洞察力。",
    },
  });

  // Convert history to Gemini format if needed, but sendMessage only takes string
  // For simplicity, we'll just send the message for now or use a more complex chat setup if needed.
  const response = await chat.sendMessage({ message });
  return response.text;
}

export async function extractSkillsFromContent(content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `从以下销售案例材料中提取可复用的销售技能 (Skills)。
    内容: ${content}
    请以 JSON 格式返回一个数组，每个技能包含:
    - type: 技能类型 (如: 沟通话术, 报价策略, 临门一脚)
    - title: 技能标题
    - preview: 技能预览内容 (如具体话术或策略)
    - tags: 标签数组
    - scenario: 适用场景
    - trigger: 触发条件对象 { signal, customer_type, stage }
    - tips: 技巧列表
    - effect: 预期效果`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            title: { type: Type.STRING },
            preview: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            scenario: { type: Type.STRING },
            trigger: {
              type: Type.OBJECT,
              properties: {
                signal: { type: Type.STRING },
                customer_type: { type: Type.STRING },
                stage: { type: Type.STRING }
              }
            },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            effect: { type: Type.STRING }
          },
          required: ["type", "title", "preview", "tags"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
}
