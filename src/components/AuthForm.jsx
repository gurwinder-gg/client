import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { GoogleLogin } from "@react-oauth/google";

const AuthForm = ({ mode = "login" }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const { loading, error, register, login, googleLogin } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [language, setLanguage] = useState("en");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login({ email, password });
    } else {
      await register({
        name,
        email,
        password,
        role,
        preferences: { language },
      }); 
    }

    if (useAuthStore.getState().user) navigate("/");
  };

  // const handleGoogleAuth = async () => {
  //   const id_token = "GOOGLE_CLIENT_ID"; 
  //   await googleLogin(id_token);
  //   if (useAuthStore.getState().user) navigate("/");
  // };

  return (
    <div className="min-h-[80vh] flex items-center justify-center backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-2xl border border-gray-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {!isLogin && (
            <>

              {/* Role selection */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="student">Student</option>
                <option value="volunteer">Volunteer</option>
              </select>

              {/* Preferences */}
              <div className="flex justify-between items-center">
                <label className="text-gray-300">Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                </select>
              </div>
            </>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-600 hover:to-teal-500 rounded-xl text-white font-semibold transition-all"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2">
          <span className="text-gray-400">or</span>
        </div>

         {/* ✅ Google Login Button */}
         <div className="flex justify-center mx-auto">
          <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const id_token = credentialResponse.credential;
            await googleLogin(id_token);
            if (useAuthStore.getState().user) navigate("/");
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
         </div>
        

        <p className="mt-4 text-gray-400 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-indigo-400 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
