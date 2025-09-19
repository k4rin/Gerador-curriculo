import axios from "axios";
export async function enhanceText(text: string, fieldType: string): Promise<string> {
  const prompt = generatePrompt(text, fieldType);
  const response = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  }, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` },
  });
  return response.data.choices[0].message.content.trim();
}

function generatePrompt(text: string, fieldType: string): string {
  if (fieldType === "summary") {
    return `Melhore o seguinte resumo profissional para um tom mais profissional e inclua palavras-chave relevantes:\n\n${text}`;
  }
  if (fieldType === "experience") {
    return `Melhore a descrição da experiência profissional usando verbos de ação e quantificação:\n\n${text}`;
  }
  return text;
}