import { Volume2 } from "lucide-react";
import useAuthStore from "../store/authStore";

const ChatBubble = ({ sender, content, onPlayTTS }) => {
    const isBot = sender === "bot";
    const { loading } = useAuthStore();

    return (
        <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
            <div
                className={`group relative max-w-[70%] px-4 py-2 rounded-xl text-sm ${isBot
                        ? "bg-gray-800 text-gray-200 rounded-bl-none"
                        : "bg-indigo-600 text-white rounded-br-none"
                    }`}
            >
                {content}
                {isBot && (
                    <button
                        onClick={() => onPlayTTS(content)}
                        aria-label="Play bot message"
                        className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-white cursor-pointer"
                    >
                        <Volume2 size={18} />
                    </button>
                    
                )}
                {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
            </div>
        </div>
    );
};

export default ChatBubble;
