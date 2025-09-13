"use client";

import axios from "axios";

import { useCallback, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

import { ConversationItem } from "../types";
import { useConversationStore } from "../store/useConversationStore";

export const UserInputText = () => {
  const [inputText, setInputText] = useState<string>("");
  const {
    conversationItems,
    addConversationItem,
    setError,
    setAssistantLoading,
  } = useConversationStore();

  //handleSendmessage function
  const handleSendmessage = useCallback(
    async (message: string) => {
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
    },
    [conversationItems, addConversationItem, setError, setAssistantLoading]
  );

  //Press "Enter" key to send message and "Shift + Enter" key to make a new line
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendmessage(inputText);
        setInputText("");
      }
    },
    [handleSendmessage, inputText]
  );

  return (
    <div className="relative w-full">
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Your message</Label>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything..."
          className="text-base min-h-[60px] md:min-h-[100px] pr-12 resize-none"
          onKeyDown={handleKeyDown}
        />
      </div>

      <Button
        size="icon"
        className="absolute bottom-3 right-3 rounded-full cursor-pointer"
        onClick={() => {
          handleSendmessage(inputText);
          setInputText("");
        }}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};
