import { useState, useEffect, useMemo } from "react";

const BookingForm = ({ counsellor, onConfirm, onCancel, existingBookings }) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Generate time slots for a day (9 AM to 5 PM, every 1 hour)
  const allSlots = useMemo(() => [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ], []);

  useEffect(() => {
    if (!appointmentDate) return;

    // Filter out already booked slots for this counsellor on selected date
    const bookedSlots = existingBookings
      .filter(b => b.counsellor.placeId === counsellor.placeId)
      .filter(b => new Date(b.appointmentDate).toDateString() === new Date(appointmentDate).toDateString())
      .map(b => new Date(b.appointmentDate).toTimeString().slice(0, 5));

    const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    setAvailableSlots(freeSlots);
    setSelectedTime("");
  }, [appointmentDate, existingBookings, counsellor.placeId, allSlots]);

  const handleConfirm = () => {
    if (!appointmentDate || !selectedTime) {
      alert("Please select date and time.");
      return;
    }
    const dateTime = new Date(`${appointmentDate}T${selectedTime}`);
    onConfirm(counsellor, dateTime.toISOString());
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-96 space-y-4 border border-gray-700">
        <h2 className="text-xl font-semibold text-indigo-400">{counsellor.name}</h2>

        <label className="block text-gray-300 text-sm">Select Date:</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
        />

        {appointmentDate && (
          <>
            <label className="block text-gray-300 text-sm mt-2">Available Time Slots:</label>
            {availableSlots.length === 0 ? (
              <p className="text-gray-400 text-sm">No slots available for this date.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 mt-1">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`px-2 py-1 rounded-lg text-sm border ${
                      selectedTime === slot
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
