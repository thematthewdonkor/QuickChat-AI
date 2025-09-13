import { create } from "zustand";
import { ConversationItem } from "../types";

//Typescript
interface ConversationState {
  conversationItems: ConversationItem[];
  error: string | null;
  addConversationItem: (message: ConversationItem) => void;
  assistantLoading: boolean;
  setAssistantLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  //Initial state
  conversationItems: [],
  assistantLoading: false,
  error: null,
  setAssistantLoading: (loading) => set({ assistantLoading: loading }),
  addConversationItem: (message) =>
    set((state) => ({
      conversationItems: [...state.conversationItems, message],
    })),
  setError: (error) => set({ error }),
}));
