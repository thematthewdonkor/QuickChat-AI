"use client";

import axios from "axios";

import { UserInputText } from "@/components/user-input-text";
import { Assistant } from "@/components/assistant";

import { ConversationItem } from "@/types";
import { useConversationStore } from "@/store/useConversationStore";

export default function HomePage() {
  const {
    conversationItems,
    error,
    assistantLoading,
    setError,
    setAssistantLoading,
    addConversationItem,
  } = useConversationStore();

  const handleSendmessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ConversationItem = {
      role: "user",
      content: message.trim(),
    };

    try {
      setAssistantLoading(true);
      addConversationItem(userMessage);

      const response = await axios.post(
        "api/chat",
        {
          messages: [...conversationItems, userMessage],
        },
        { headers: { "Content-type": "application/json" } }
      );

      const assistantMessage: ConversationItem = {
        role: "assistant",
        content: response.data.assistantText,
      };

      addConversationItem(assistantMessage);
      setAssistantLoading(false);
    } catch (error) {
      console.log("Error about the input text", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setAssistantLoading(false);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-between min-h-screen px-8 py-16  bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-balance text-center mb-4">
        How Can I <span className="text-sky-700">Assist You Today?</span>
      </h1>

      <div className="flex-1 w-full max-w-3xl flex flex-col justify-between gap-6">
        <Assistant
          items={conversationItems}
          error={error}
          loading={assistantLoading}
        />
        <UserInputText onSendMessage={handleSendmessage} />
      </div>
    </div>
  );
}
