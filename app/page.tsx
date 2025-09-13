import { UserInputText } from "@/components/user-input-text";
import { ResponseChat } from "@/components/response-chat";

export default async function HomePage() {
  return (
    <div className="font-sans flex flex-col items-center justify-between min-h-screen p-8 sm:p-8 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
        QuickChat AI
      </h1>

      <div className="flex-1 w-full max-w-3xl flex flex-col justify-between gap-6">
        <ResponseChat />
        <UserInputText />
      </div>
    </div>
  );
}
