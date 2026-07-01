import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = "@studyvid_chat_history";

const AI_RESPONSES: Record<string, string[]> = {
  video: [
    "Great topic for a video! I can help you create an engaging educational video. What specific aspects would you like to cover?",
    "That would make an excellent video! Let me suggest some key points to include for maximum learning impact.",
    "Perfect choice for video content! Would you like me to help structure the script with an introduction, main points, and conclusion?",
  ],
  explain: [
    "Let me break this down for you in simple terms...",
    "Here's a clear explanation that might help you understand better...",
    "Great question! This is actually a fascinating topic. Here's what you need to know...",
  ],
  help: [
    "I'm here to help you learn! You can ask me to explain topics, suggest video ideas, or help you research subjects for your studies.",
    "I can assist you with: explaining complex topics, brainstorming video ideas, providing study tips, and helping you research any subject!",
    "Need help studying? I can explain concepts, suggest educational video topics, or answer questions about any subject you're learning.",
  ],
  science: [
    "Science is fascinating! Popular video topics include: experiments, natural phenomena, biology, chemistry, and physics concepts. What interests you?",
    "For science videos, visual demonstrations work great! Consider topics like the solar system, human body, chemical reactions, or forces of nature.",
  ],
  math: [
    "Math videos can be very engaging! Try topics like: visual proofs, real-world applications, problem-solving strategies, or mathematical puzzles.",
    "For math content, step-by-step explanations with visuals work best. What specific area would you like to explore?",
  ],
  history: [
    "History videos are compelling with storytelling! Consider topics like: key events, influential figures, ancient civilizations, or how past events shaped today.",
    "For history content, narrative-driven videos with images and timelines work wonderfully. What era interests you?",
  ],
  default: [
    "That's an interesting topic! Would you like me to help you create a video about it or explain it in more detail?",
    "Great question! I can help you explore this topic further. Would you like video suggestions or a detailed explanation?",
    "I'd be happy to help with that! Would you like me to suggest some video ideas or provide more information on this subject?",
    "Interesting! This could make a great educational video. What angle would you like to take?",
    "That's a topic many students find valuable. How would you like me to help - with video creation ideas or deeper research?",
  ],
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("video") || lowerMessage.includes("create") || lowerMessage.includes("make")) {
    return AI_RESPONSES.video[Math.floor(Math.random() * AI_RESPONSES.video.length)];
  }
  if (lowerMessage.includes("explain") || lowerMessage.includes("what is") || lowerMessage.includes("how does")) {
    return AI_RESPONSES.explain[Math.floor(Math.random() * AI_RESPONSES.explain.length)];
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
    return AI_RESPONSES.help[Math.floor(Math.random() * AI_RESPONSES.help.length)];
  }
  if (lowerMessage.includes("science") || lowerMessage.includes("physics") || lowerMessage.includes("biology") || lowerMessage.includes("chemistry")) {
    return AI_RESPONSES.science[Math.floor(Math.random() * AI_RESPONSES.science.length)];
  }
  if (lowerMessage.includes("math") || lowerMessage.includes("algebra") || lowerMessage.includes("geometry") || lowerMessage.includes("calculus")) {
    return AI_RESPONSES.math[Math.floor(Math.random() * AI_RESPONSES.math.length)];
  }
  if (lowerMessage.includes("history") || lowerMessage.includes("ancient") || lowerMessage.includes("war") || lowerMessage.includes("civilization")) {
    return AI_RESPONSES.history[Math.floor(Math.random() * AI_RESPONSES.history.length)];
  }
  
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const welcomeMessage: ChatMessage = {
          id: "welcome",
          text: "Hi! I'm your Study Assistant. I can help you explore topics, explain concepts, and create educational video ideas. What would you like to learn about today?",
          isUser: false,
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const saveMessages = async (newMessages: ChatMessage[]) => {
    try {
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(text),
      isUser: false,
      timestamp: Date.now(),
    };

    const finalMessages = [...newMessages, aiResponse];
    setMessages(finalMessages);
    setIsTyping(false);
    await saveMessages(finalMessages);
  }, [messages]);

  const clearHistory = async () => {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      text: "Hi! I'm your Study Assistant. I can help you explore topics, explain concepts, and create educational video ideas. What would you like to learn about today?",
      isUser: false,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
    await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearHistory }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
