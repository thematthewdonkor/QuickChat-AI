"use client";

import { useCallback, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface UserInputTextProps {
  onSendMessage: (message: string) => void;
}

export const UserInputText = ({ onSendMessage }: UserInputTextProps) => {
  const [inputText, setInputText] = useState<string>("");

  //Press "Enter" key to send message and "Shift + Enter" key to make a new line
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSendMessage(inputText);
        setInputText("");
      }
    },
    [onSendMessage, inputText]
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
          onSendMessage(inputText);
          setInputText("");
        }}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};
