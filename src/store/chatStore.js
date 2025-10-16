// src/store/chatStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { sendMessage, getChatHistory } from "../api/chatApi";

const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      loading: false,

      // load history from backend
      fetchHistory: async () => {
        try {
          const history = await getChatHistory();
          set({ messages: history });
        } catch (err) {
          console.error("Fetch history failed:", err.message);
        }
      },

      // send a new message
sendChat: async (message) => {
  // optimistic update
  set((state) => ({ messages: [...state.messages, { sender: "user", content: message }] }));
  set({ loading: true });
  try {
    const res = await sendMessage(message);
    set({ messages: res.chat.messages }); // replace with actual decrypted messages
    return res;
  } catch (err) {
    console.error("Send chat failed:", err.message);
  } finally {
    set({ loading: false });
  }
},


      // clear local messages (useful on logout)
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage", // storage key in localStorage
      partialize: (state) => ({ messages: state.messages.map(m => ({ ...m, content: btoa(m.content) })) }),

    }
  )
);

export default useChatStore;
