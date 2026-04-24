import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="font-bold text-xl gradient-text">FUNGEP</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/universities" className="text-gray-600 hover:text-brand-600 font-medium transition">
              Universities
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-brand-600 font-medium transition">
              Resources
            </Link>
            <Link to="/calculator" className="text-gray-600 hover:text-brand-600 font-medium transition">
              Calculator
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <button className="text-gray-600 hover:text-brand-600 font-medium transition">
                    {user?.name || 'Dashboard'}
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-gray-600 hover:text-brand-600 font-medium transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn-primary px-4 py-2">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Sidebar({ isOpen, onClose }) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-41 overflow-y-auto">
        <div className="p-6 space-y-4">
          <Link
            to="/universities"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
            onClick={onClose}
          >
            Universities
          </Link>
          <Link
            to="/resources"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
            onClick={onClose}
          >
            Resources
          </Link>
          <Link
            to="/calculator"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
            onClick={onClose}
          >
            Calculator
          </Link>

          {isAuthenticated && (
            <>
              <hr className="my-4" />
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FUNGEP</h3>
            <p className="text-gray-400">Pakistan's #1 entry test preparation platform.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/universities" className="hover:text-white transition">Universities</Link></li>
              <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition">Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy.html" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms.html" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">Email: info@fungep.app</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FUNGEP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
