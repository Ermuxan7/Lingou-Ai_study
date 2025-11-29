"use client";

import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AssistantContentProps {
  messages: Message[];
  isAsking: boolean;
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleAskQuestion: () => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function AssistantContent({
  messages,
  isAsking,
  inputMessage,
  setInputMessage,
  handleAskQuestion,
  messagesEndRef,
  inputRef,
}: AssistantContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Mavzu bo'yicha savollaringizni bering
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-lg text-sm",
                msg.role === "user" ? "bg-primary/10 ml-4" : "bg-muted/50 mr-4"
              )}
            >
              <p className="text-foreground/90 whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          ))}
          {isAsking && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Javob yozilmoqda...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-3 border-t border-border/50 mt-auto shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            placeholder="Savol bering..."
            disabled={isAsking}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            onClick={handleAskQuestion}
            size="icon"
            disabled={isAsking || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
