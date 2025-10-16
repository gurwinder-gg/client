import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchAdminStats, fetchUsers, fetchAssessments, fetchChatStats } from "../api/adminApi";

const useAdminStore = create(persist(
  (set) => ({
    stats: { users: 0, counsellors: 0, assessments: 0, chats: 0 },
    users: [],
    assessments: [],
    chatStats: [],
    loading: false,

    getStats: async () => {
      set({ loading: true });
      try {
        const stats = await fetchAdminStats();
        set({ stats });
      } catch (err) {
        console.error("Fetch stats failed:", err.message);
      } finally {
        set({ loading: false });
      }
    },

    getUsers: async () => {
      set({ loading: true });
      try {
        const users = await fetchUsers();
        set({ users });
      } catch (err) {
        console.error("Fetch users failed:", err.message);
      } finally {
        set({ loading: false });
      }
    },

    getAssessments: async () => {
      set({ loading: true });
      try {
        const assessments = await fetchAssessments();
        set({ assessments });
      } catch (err) {
        console.error("Fetch assessments failed:", err.message);
      } finally {
        set({ loading: false });
      }
    },

    getChatStats: async () => {
      set({ loading: true });
      try {
        const chatStats = await fetchChatStats();
        set({ chatStats });
      } catch (err) {
        console.error("Fetch chat stats failed:", err.message);
      } finally {
        set({ loading: false });
      }
    },
  }),
  { name: "admin-storage", partialize: state => ({ stats: state.stats }) }
));

export default useAdminStore;
