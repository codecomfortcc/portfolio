import React from 'react'
import { Message } from './chatbot'
import { cn } from '@/lib/utils'
export interface MessageViewerProps{
  messageListRef:React.Ref<HTMLDivElement> |null;
  messages:Message[];
}

const MessageViewer = ({messageListRef,messages}:MessageViewerProps) => {
  return (
    <div ref={messageListRef} className="space-y-4 p-2">
          {messages.map((msg:Message) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={cn(
                  "p-3 rounded-lg max-w-xs md:max-w-md break-words", // Added
                  msg.sender !== "user"
                    ? "bg-primary rounded-xl text-white"
                    : "bg-orange-100 border-dash-long font-bold text-gray-800"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
  )
}

export default MessageViewer
