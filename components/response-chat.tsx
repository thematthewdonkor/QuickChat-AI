"use client";

import { cn } from "@/lib/utils";
import { useConversationStore } from "@/store/useConversationStore";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const ResponseChat = () => {
  const { conversationItems, error, assistantLoading } = useConversationStore();

  return (
    <div className="flex flex-col space-y-4 w-full max-w-2xl mx-auto p-2">
      {conversationItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            "max-w-[85%] p-3 rounded-2xl text-sm sm:text-base leading-relaxed break-words",
            item.role === "user"
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-100 text-gray-900 self-start mr-auto"
          )}
        >
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      ))}

      {assistantLoading && (
        <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-2xl w-fit">
          <Bot className="w-5 h-5 animate-pulse" />
        </div>
      )}

      {error && <div className="text-red-500 font-medium">{error}</div>}
    </div>
  );
};
