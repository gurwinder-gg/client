import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User as UserIcon } from "lucide-react";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // mobile nav
  const [showProfile, setShowProfile] = useState(false); // profile dropdown
  const [loadingUser, setLoadingUser] = useState(true);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Book", path: "/book" },
    { name: "Test", path: "/test" },
    { name: "Resources", path: "/resources" },
    { name: "Forum", path: "/forum" },
  ];

  const { user, logout, fetchUser } = useAuthStore();

useEffect(() => {
  const loadUser = async () => {
    await fetchUser();
    setLoadingUser(false);
  };
  loadUser();
}, [fetchUser]);

  useEffect(() => {
  setIsOpen(false);       
  setShowProfile(false);  
}, [user]);

if (loadingUser) {
  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <span className="text-gray-400">Loading...</span>
      </div>
    </nav>
  );
}

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent"
        >
          <img
            src="/images/TS-logo.jpg"
            alt="TS"
            className="inline-block w-8 h-8 mr-2 rounded-full"
          />
          ThodaSukoon
        </Link>

        {/* Center: Routes (desktop only) */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative transition ${
                location.pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right: Auth + Profile + Hamburger */}
        <div className="flex items-center space-x-3 relative">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hidden md:block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition cursor-pointer"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Profile button */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer  "
              >
                <UserIcon size={20} />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-12 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 space-y-2 z-50 ">
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <p className="text-gray-300 text-sm">Role: {user.role}</p>
                  <p className="text-gray-300 text-sm">
                    Language: {user.preferences?.language}
                  </p>
                  <button
                    onClick={logout}
                    className="w-full mt-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden w-full bg-gray-800/80 backdrop-blur-3xl border-t border-gray-700 flex flex-col items-center py-4 space-y-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-semibold transition"
            >
              Admin
            </Link>
          )}

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname === item.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-white"
              } transition`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
