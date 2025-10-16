import { Send } from "lucide-react";

const Forum = () => {
  const posts = [
    { user: "Anon123", text: "I feel anxious before exams. Any tips?" },
    { user: "Anon456", text: "Journaling really helps me process my thoughts." },
    { user: "Anon789", text: "Meditation helps me calm down." },
  ];

  return (
    <div className=" w-[80vw] min-h-[80vh] mx-auto space-y-6 p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center md:text-left">
        Community Forum
      </h2>

      {/* Posts */}
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {posts.map((p, i) => (
          <div
            key={i}
            className="p-4 bg-gray-900/70 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {p.user.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm text-gray-400">👤 {p.user}</p>
            </div>
            <p className="mt-2 text-gray-100">{p.text}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <textarea
          placeholder="Share your thoughts..."
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          rows={2}
        />
        <button
          className="px-6 py-3  bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-md disabled:opacity-50 cursor-pointer transition "
        >
           <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default Forum;
