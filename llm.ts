// Lightweight Hugging Face Inference API client with stub fallback
import { ChatMessage } from "../Contexts/ChatContext";

const HF_API_URL = "https://api-inference.huggingface.co/models/";
const HF_MODEL = process.env.HF_MODEL || "gpt2"; // default lightweight model
const HF_API_KEY = process.env.EXPO_PUBLIC_HF_API_KEY || process.env.HF_API_KEY || "";

export async function fetchLLMReply(prompt: string, lang?: string): Promise<string> {
  // If no API key provided, return a simple deterministic stub reply
  if (!HF_API_KEY) {
    return `Stub reply: I heard \"${prompt}\". (no API key configured)`;
  }

  try {
    const url = HF_API_URL + HF_MODEL;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.warn("HuggingFace response not ok:", res.status, text);
      return `Sorry, the LLM request failed (status ${res.status}).`;
    }

    const data = await res.json();
    // HF Inference often returns an array of objects or a plain string depending on model
    if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0] === "string") return data[0];
      if (data[0].generated_text) return data[0].generated_text;
      return JSON.stringify(data[0]);
    }
    if (typeof data === "string") return data;
    if (data.generated_text) return data.generated_text;
    return JSON.stringify(data);
  } catch (err) {
    console.error("LLM request failed:", err);
    return "Sorry, I couldn't reach the AI service.";
  }
}

export async function streamLLMReply(_prompt: string): Promise<AsyncGenerator<string, void, unknown>> {
  // Simple non-streaming fallback that yields full reply once
  const reply = await fetchLLMReply(_prompt);
  async function* gen() {
    yield reply;
  }
  return gen();
}
