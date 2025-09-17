import { cn } from "@/lib/utils";
import { ConversationItem } from "@/types";
import { Bot } from "lucide-react";
import { Markdown } from "./markdown";

interface AssistantProps {
  items: ConversationItem[];
  error: string | null;
  loading: boolean;
}

export const Assistant = ({ items, loading, error }: AssistantProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-2xl mx-auto p-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "max-w-[90%] p-3 rounded-2xl text-sm sm:text-base leading-relaxed break-words text-wrap",
            item.role === "user"
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-100 text-gray-900 self-start mr-auto"
          )}
        >
          <Markdown content={item.content} />
        </div>
      ))}

      {loading && (
        <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-2xl w-fit">
          <Bot className="w-5 h-5 animate-pulse" />
        </div>
      )}

      {error && <div className="text-red-500 font-medium">{error}</div>}
    </div>
  );
};
