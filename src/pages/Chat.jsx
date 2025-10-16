import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react"; 
import ChatBubble from "../components/ChatBubble";
import { sendMessage, getChatHistory, getTTS } from "../api/chatApi";
import TTSOverlay from "../utils/TTSOverlay";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", content: "👋 Hi! I'm ThodaSukoon. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ttsSrc, setTtsSrc] = useState(null); // overlay audio
  const bottomRef = useRef();

  // fetch history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getChatHistory();
        if (history.length > 0) setMessages(history);
      } catch (err) {
        console.error("Failed to fetch chat history:", err.message);
      }
    };
    fetchData();
  }, []);

  // auto-scroll inside chat only
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
}, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);
      setMessages(res.chat.messages);
    } catch (err) {
      console.error("Send message failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

const playTTS = async (text) => {
  try {
    if (ttsSrc) setTtsSrc(null); // stop previous
    const audioUrls = await getTTS(text);
    setTtsSrc(audioUrls);
  } catch (err) {
    console.error("TTS failed:", err.message);
  }
};


  return (
    <div className="w-[95vw] h-[85vh] flex flex-col bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-md rounded-xl border-2 border-gray-800">
        <div className="border-b border-gray-800">

        <h1 className="text-xl font-bold p-4">Thoda Sukoon ChatBot</h1>
        </div>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} content={msg.content} onPlayTTS={playTTS} />
        ))}
        {loading && (
          <div className="text-gray-400 italic">Bot is typing...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-800 flex gap-3 bg-black/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="p-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-md disabled:opacity-50 cursor-pointer transition "
        >
          {loading ? "..." : <Send size={20} />}
        </button>
      </div>
  {/* TTS Overlay */}
  {ttsSrc && ttsSrc.length > 0 && <TTSOverlay audioUrls={ttsSrc} onClose={() => setTtsSrc(null)} />}
    </div>
  );
};

export default Chat;
