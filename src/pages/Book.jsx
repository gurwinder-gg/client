import { useEffect, useState } from "react";
import useBookingStore from "../store/bookingStore";
import BookingForm from "../components/BookingForm";

const Book = () => {
    const [search, setSearch] = useState("");
    const [selectedCounsellor, setSelectedCounsellor] = useState(null);

    const { counsellors, bookings, fetchCounsellors, fetchBookings, addBooking, loading } = useBookingStore();

    useEffect(() => {
        const getUserLocationAndFetch = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchCounsellors(position.coords.latitude, position.coords.longitude),
                    () => fetchCounsellors(22.5726, 88.3639)
                );
            } else fetchCounsellors(22.5726, 88.3639);
            fetchBookings();
        };
        getUserLocationAndFetch();
    }, [fetchCounsellors, fetchBookings]);

    const filteredCounsellors = counsellors.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full mx-auto p-4 md:p-8 space-y-8">
            <h2 className="text-3xl font-bold text-indigo-400">Book an Appointment</h2>
            <p className="text-gray-300">Find nearby counselors and book a session at your convenience.</p>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <input
                        type="text"
                        placeholder="Search counsellors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                        {loading ? (
                            <p className="text-gray-400 col-span-2">Loading counsellors...</p>
                        ) : filteredCounsellors.length === 0 ? (
                            <p className="text-gray-400 col-span-2">No counsellors found.</p>
                        ) : (
                            filteredCounsellors.map(c => (
                                <div
                                    key={c.placeId}
                                    className="p-4 md:p-5 rounded-xl bg-gray-900/60 border border-gray-700 shadow hover:shadow-lg transition flex flex-col h-64 lg:h-72"
                                >
                                    <div className="space-y-2 flex-1">
                                        <h3 className="text-lg font-bold text-indigo-300 hover:text-indigo-400 transition-colors break-words">
                                            {c.name}
                                        </h3>

                                        <p className="text-gray-400 text-xs flex flex-wrap gap-1">
                                            {c.tags.map((tag, i) => (
                                                <span key={i} className="bg-blue-600/60 px-2 py-1 rounded-full text-xs text-gray-300 break-words">
                                                    {tag}
                                                </span>
                                            ))}
                                        </p>

                                        <p className="text-gray-300 text-xs flex items-center gap-1 break-words">
                                            <span>📍</span>
                                            <span>{c.address}</span>
                                        </p>

                                        <p className="text-yellow-400 text-sm flex items-center gap-1">
                                            <span>⭐</span>
                                            {c.rating || "N/A"}
                                        </p>

                                        <a
                                            href={c.directionsUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-400 text-md underline flex items-center gap-1 hover:text-indigo-300"
                                        >
                                            <span>🗺️</span> Get Directions
                                        </a>
                                    </div>

                                    <button
                                        onClick={() => setSelectedCounsellor(c)}
                                        className="mt-auto w-full px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 cursor-pointer"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                </div>

                {/* Right: tips + bookings */}
                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 shadow">
                        <h3 className="text-lg font-semibold text-indigo-400">Tips for Booking</h3>
                        <ul className="text-gray-300 list-disc list-inside mt-2 text-sm space-y-1">
                            <li>Check the counsellor's specialization.</li>
                            <li>Choose a time that suits your schedule.</li>
                            <li>Keep your sessions consistent for best results.</li>
                            <li>Reach out early to avoid last-minute bookings.</li>
                        </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 shadow max-h-[600px] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-indigo-400 mb-2">Your Bookings</h3>
                        {bookings?.length === 0 ? (
                            <p className="text-gray-400 text-sm">No bookings yet.</p>
                        ) : (
                            bookings?.map(b => (
                                <div key={b._id} className="p-3 rounded-lg bg-gray-800/70 border border-gray-700 mb-2">
                                    <p className="text-gray-100 font-semibold">{b.counsellor.name}</p>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(b.appointmentDate).toLocaleDateString()} |{" "}
                                        {new Date(b.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay booking form */}
            {selectedCounsellor && (
                <BookingForm
                    counsellor={selectedCounsellor}
                    existingBookings={bookings}
                    onConfirm={(counsellor, date) => {
                        addBooking(counsellor, date);
                        setSelectedCounsellor(null);
                    }}
                    onCancel={() => setSelectedCounsellor(null)}
                />
            )}
        </div>
    );
};

export default Book;
