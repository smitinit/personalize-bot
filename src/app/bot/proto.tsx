"use client";

import "./proto.css";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner"; // ✨ Toast integration here
import { Skeleton } from "@/components/ui/skeleton";

import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface BotProps {
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  height?: number | string;
  width?: number | string;
  title?: string;
  userId: string;
}

const MessageContent = ({ content }: { content: string }) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const parts: Array<{
    type: "text" | "code";
    content: string;
    language?: string;
  }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      content: match[2] ?? "",
      language: match[1] ?? "javascript",
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return (
    <div className="space-y-2 overflow-hidden">
      {parts.map((part, index) =>
        part.type === "code" ? (
          <SyntaxHighlighter
            key={index}
            language={part.language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: "0.375rem" }}
            className="text-xs"
          >
            {part.content}
          </SyntaxHighlighter>
        ) : (
          <ReactMarkdown
            key={index}
            components={{
              p: (props) => <p className="mb-2" {...props} />,
              h1: (props) => (
                <h1 className="mb-2 text-lg font-bold" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-md mb-2 font-bold" {...props} />
              ),
              h3: (props) => (
                <h3 className="mb-1 text-sm font-bold" {...props} />
              ),
              ul: (props) => <ul className="mb-2 list-disc pl-5" {...props} />,
              ol: (props) => (
                <ol className="mb-2 list-decimal pl-5" {...props} />
              ),
              li: (props) => <li className="mb-1" {...props} />,
              a: (props) => (
                <a className="text-blue-500 underline" {...props} />
              ),
              strong: (props) => <strong className="font-bold" {...props} />,
              em: (props) => <em className="italic" {...props} />,
              code: (({
                inline,
                ...props
              }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) =>
                inline ? (
                  <code
                    className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800"
                    {...props}
                  />
                ) : (
                  <code {...props} />
                )) as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
            }}
          >
            {part.content}
          </ReactMarkdown>
        ),
      )}
    </div>
  );
};

export default function Bot({
  position = "bottom-left",
  height = 500,
  width = 350,
  title = "AI Assistant",
  userId,
}: BotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);
  const avatarUrlRef = useRef<string>(
    "https://jx3ho0f5cb.ufs.sh/f/AcnTK5Ra9jRce5yNtocDaStisjAR6rxuLlC90dOo5GKygQP3",
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    InputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;
    let isMounted = true;
    const controller = new AbortController();

    async function fetchAvatar() {
      try {
        const res = await fetch("/api/fetchavatar", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOT_API_KEY}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Failed to fetch avatar: ${res.status}`);
        const { botAvatarUrl } = (await res.json()) as { botAvatarUrl: string };
        if (botAvatarUrl && isMounted) {
          avatarUrlRef.current = botAvatarUrl;
        }
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          toast.error("⚡ Failed to load bot avatar. Still good to chat!");
          console.error("Avatar fetch error:", err);
        }
      }
    }

    fetchAvatar().catch(console.error);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmed,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOT_API_KEY}`,
          "X-User-Id": userId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok)
        throw new Error(`Server responded with status ${res.status}`);

      const data = (await res.json()) as { response: string };
      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      clearTimeout(timeout);
      console.error("Message send error:", error);

      toast.error("⚡ Something went wrong while sending your message.");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          content: "⚡ Oops! I couldn't process that. Try again!",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage().catch(console.error);
    }
  };

  const positionStyles: Record<NonNullable<BotProps["position"]>, string> = {
    "bottom-left": "left-4 bottom-4",
    "bottom-right": "right-4 bottom-4",
    "top-left": "left-4 top-4",
    "top-right": "right-4 top-4",
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed z-50 h-12 w-12 animate-bounce rounded-full bg-transparent p-2 shadow-lg transition-all duration-300 hover:scale-110",
          positionStyles[position],
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        size="icon"
      >
        <Avatar className="h-12 w-12 rounded-full border-1 border-slate-500 object-cover object-center">
          <Image
            className="absolute object-fill object-center"
            src={avatarUrlRef.current}
            alt="Bot Avatar"
            width={128}
            height={128}
          />
        </Avatar>
      </Button>

      <div
        className={cn(
          "fixed z-50 rounded-xl shadow-xl transition-all duration-300",
          positionStyles[position],
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          maxWidth: "90vw",
          maxHeight: "80vh",
        }}
      >
        <Card className="z-1000 flex h-full w-full flex-col overflow-hidden border-1 border-slate-500 dark:border-slate-200">
          <CardHeader className="flex items-center justify-between border-b px-4 py-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <Image
                  src={avatarUrlRef.current}
                  alt="Bot Avatar"
                  width={128}
                  height={128}
                />
              </Avatar>
              <h3 className="text-sm font-semibold">{title}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent
            className="flex-1 space-y-4 overflow-y-auto px-3"
            id="bot-container"
          >
            {!userId && (
              <div className="text-muted-foreground flex flex-col items-center gap-4 p-4 text-sm">
                <span> Please log in to chat with the bot. </span>
                <SignInButton>
                  <Button className="w-fit rounded-none">Signin</Button>
                </SignInButton>
              </div>
            )}
            {userId && messages.length === 0 && (
              <div className="text-muted-foreground text-center text-sm">
                Hello! How can I help you today?
              </div>
            )}

            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }} // slight stagger
                className={cn(
                  "flex items-start gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {msg.role === "assistant" && (
                  <Avatar className="mt-1 h-8 w-8 shrink-0">
                    <Image
                      src={avatarUrlRef.current}
                      alt="Bot Avatar"
                      width={128}
                      height={128}
                    />
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  {msg.role === "assistant" &&
                  loading &&
                  index === messages.length - 1 ? (
                    <div className="flex flex-col space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : msg.role === "assistant" ? (
                    <MessageContent content={msg.content} />
                  ) : (
                    msg.content
                  )}
                  <div className="mt-1 text-[0.5rem] opacity-50">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </motion.div>
            ))}

            <div ref={bottomRef} />
          </CardContent>

          <CardFooter className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage().catch(console.error);
              }}
              className="flex w-full gap-2"
            >
              <Input
                ref={InputRef}
                placeholder="Ask anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || !userId}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={loading}>
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
