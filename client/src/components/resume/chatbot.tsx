"use client";

import React, {
  useState,
  FormEvent,
  useRef,
  useEffect,
  ChangeEvent,
  useLayoutEffect,
} from "react";
import Fuse from "fuse.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { gsap } from "gsap";
import { SendInput } from "./send-input";
import MessageViewer from "./messages-viewer";
import { intentData,fallbackAnswer  } from "@/constants/qa-data";
const fuse = new Fuse(intentData, { keys: ["question"], threshold: 0.4 });

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}
const getBotResponse = (userInput: string): string => {
  const normalizedInput = userInput.toLowerCase().trim();

  // Loop through our intents
  for (const intent of intentData) {
    // Check if any keyword for this intent is in the user's input
    const match = intent.keywords.some(keyword => normalizedInput.includes(keyword));
    
    if (match) {
      return intent.answer;
    }
  }


  return fallbackAnswer;
};
const useBreakpoint = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);
  return isMobile;
};
const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi! Ask me about Yasovardhan's resume." },
  ]);
  const [input, setInput] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);
  
  // ... (keep your useEffects/useLayoutEffects for scrolling and animation, they are correct) ...
  useLayoutEffect(() => {
    const lastMessage = messageListRef.current?.lastElementChild;
    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      (lastMessage as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);


  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    

    const botResponseText = getBotResponse(input);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: botResponseText,
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  // ... (keep the rest of your return JSX, it's perfect) ...
  return (
    <div className="flex flex-col h-full bg-[#fff2e2] rounded-lg md:p-4 ">
      <ScrollArea className="flex-1 md:h-auto px-3 code-scrollbar">
        <MessageViewer messageListRef={messageListRef} messages={messages} />
      </ScrollArea>
      <SendInput
        maxRows={3}
        value={input}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Chatbot;
