import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findCounsellors, bookAppointment, getUserBookings } from "../api/appointmentApi";

const useBookingStore = create(
    persist(
        (set) => ({
            counsellors: [],
            bookings: [],
            loading: false,
            message: "",

            fetchCounsellors: async (lat, lng) => {
                set({ loading: true });
                try {
                    const res = await findCounsellors({ lat, lng });
                    set({ counsellors: res.counsellors, loading: false });
                } catch (err) {
                    set({ message: "Failed to fetch counsellors", loading: false });
                    console.error("Fetch counsellors error:", err);
                }
            },

            fetchBookings: async () => {
                set({ loading: true });
                try {
                    const res = await getUserBookings();
                    set({ bookings: res.appointments || [], loading: false });
                } catch (err) {
                    set({ message: "Failed to fetch bookings", loading: false });
                    console.error("Fetch bookings error:", err);
                }
            },

            addBooking: async (counsellor, date) => {
                set({ loading: true });
                try {
                    const res = await bookAppointment({ counsellor, appointmentDate: date });
                    set((state) => ({
                        bookings: [...state.bookings, res.appointment],
                        loading: false,
                        message: "Appointment booked successfully!",
                    }));
                } catch (err) {
                    set({ message: "Booking failed", loading: false });
                    console.error("Booking error:", err);
                }
            },
        }),
        {
            name: "booking-storage", // unique key in localStorage
            getStorage: () => localStorage,
        }
    )
);

export default useBookingStore;
