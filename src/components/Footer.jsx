import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 justify-center space-x-3 mb-4 lg:mb-0">
                <img className="w-10 h-10 mx-auto rounded-full" src="/images/TS-logo.jpg" alt="ThodaSukoon Logo" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
              ThodaSukoon
            </h2>
            </div>
            
            <p className="mt-2 text-sm text-gray-400">
              A safe, stigma-free space for mental well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-400 underline font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/chat" className="hover:text-indigo-400 transition">Chat</Link></li>
              <li><Link to="/book" className="hover:text-indigo-400 transition">Book</Link></li>
              <li><Link to="/test" className="hover:text-indigo-400 transition">Take a Test</Link></li>
              <li><Link to="/resources" className="hover:text-indigo-400 transition">Resources</Link></li>
              <li><Link to="/forum" className="hover:text-indigo-400 transition">Forum</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-300 font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-400">
              Reach out anytime — we’re here for you.  
            </p>
            <p className="mt-2 text-sm">
              📧 <span className="text-indigo-400">support@thodasukoon.org</span>
            </p>
          </div>
        </div>

        {/* Crisis Helpline */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ThodaSukoon — Your Safe Space</p>
          <p className="mt-2">
            ⚠️ If you are in crisis, please call{" "}
            <span className="text-indigo-400 underline">
              Tele-MANAS: 14416 / 1800-891-4416
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
