// ...existing code...
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Book from "./pages/Book";
import Test from "./pages/Test";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Admin from "./pages/AdminDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";

// Add CursorFollower import
import CursorFollower from "./components/CursorFollower";

const App = () => {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      {/* Add cursor follower for interactive UI */}
      <CursorFollower />
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-slate-800 to-indigo-800 text-white">
        <Navbar />
        <main className="flex-1 mx-auto px-4 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <Book />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forum"
              element={
                <ProtectedRoute>
                  <Forum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
// ...existing code...