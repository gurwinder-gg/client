// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authApi from "../api/authApi"; // API file we’ll create

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            login: async (credentials) => {
                set({ loading: true, error: null });
                try {
                    const res = await authApi.loginUser(credentials);
                    set({ token: res.data.token });
                    // fetch current user right after login
                    await get().fetchUser();
                } catch (err) {
                    set({ error: err.response?.data?.message || "Login failed" });
                } finally {
                    set({ loading: false });
                } 
            },

            register: async (userData) => {
                set({ loading: true, error: null });
                try {
                    const res = await authApi.registerUser(userData);
                    set({ token: res.data.token });
                    // fetch user immediately
                    await get().fetchUser();
                } catch (err) {
                    set({ error: err.response?.data?.message || "Signup failed" });
                } finally {
                    set({ loading: false });
                }
            },


            // --- Google Login ---
            googleLogin: async (id_token) => {
                try {
                    set({ loading: true, error: null });
                    const res = await authApi.googleLogin(id_token);
                    set({ user: res.data.user, token: res.data.token, loading: false });
                } catch (err) {
                    set({ error: err.response?.data?.message || err.message, loading: false });
                }
            },

            // --- Logout ---
            logout: async () => {
                try {
                    const token = get().token;
                    if (token) await authApi.logoutUser(token);
                    set({ user: null, token: null });
                } catch (err) {
                    console.error(err);
                }
            },

            // --- Fetch Current User ---
            fetchUser: async () => {
                try {
                    const token = get().token;
                    if (!token) return;
                    const res = await authApi.getCurrentUser(token);
                    set({ user: res.data });
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        {
            name: "auth-storage", // persistent key in localStorage
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
