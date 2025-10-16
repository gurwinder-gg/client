import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between p-8 ">
      {/* Left side */}
      <div className="flex-1 text-center md:text-left space-y-6">
  <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow">
          Welcome to ThodaSukoon
        </h1>
  <p className="text-gray-200 max-w-lg">
          Your stigma-free platform for mental wellness. Talk anonymously, take self-assessments, book appointments, and connect with resources.
        </p>
      </div>

      {/* Right side */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 place-content-center gap-6">
        <Link
          to="/chat"
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 hover:from-cyan-400 hover:to-blue-800 transition shadow-lg text-white font-semibold border border-blue-900/40 backdrop-blur-sm"
        >
          <span className="text-xl">💬</span>
          <span className="mt-2">Start Chat</span>
        </Link>

        <Link
          to="/book"
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-700 hover:from-pink-400 hover:to-blue-800 transition shadow-lg text-white font-semibold border border-blue-900/40 backdrop-blur-sm"
        >
          <span className="text-xl">📅</span>
          <span className="mt-2">Book Appointment</span>
        </Link>

        <Link
          to="/test"
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 hover:from-cyan-300 hover:to-blue-800 transition shadow-lg text-white font-semibold border border-blue-900/40 backdrop-blur-sm"
        >
          <span className="text-xl">📝</span>
          <span className="mt-2">Take a Test</span>
        </Link>

        <Link
          to="/resources"
          className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-blue-700 hover:from-yellow-300 hover:to-blue-800 transition shadow-lg text-white font-semibold border border-blue-900/40 backdrop-blur-sm"
        >
          <span className="text-xl">📚</span>
          <span className="mt-2">Resources</span>
        </Link>

      </div>
    </div>
  );
};

export default Home;
