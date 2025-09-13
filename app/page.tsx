import { UserInputText } from "@/components/user-input-text";
import { ResponseChat } from "@/components/response-chat";

export default async function HomePage() {
  return (
    <div className="font-sans flex flex-col items-center justify-between min-h-screen px-8 py-16  bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-balance text-center mb-4">
        How Can I <span className="text-sky-700">Assist You Today?</span>
      </h1>

      <div className="flex-1 w-full max-w-3xl flex flex-col justify-between gap-6">
        <ResponseChat />
        <UserInputText />
      </div>
    </div>
  );
}
