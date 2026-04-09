import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X, Home, Briefcase, Award, User, Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';


const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: Briefcase },
  { path: '/skills', label: 'Skills', icon: Award },
  { path: '/about', label: 'About', icon: User },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hamburger Menu Button */}
      <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="fixed top-8 right-8 z-50 p-2 flex flex-col justify-center items-center w-10 h-10 rounded-full hover:scale-115 transition-transform duration-200"
  aria-label="Toggle menu"
>
  <span className={`block w-6 h-0.5 my-0.5 rounded-full scale-115 bg-black dark:bg-white transition-all duration-330 ${
    isMenuOpen ? 'rotate-45 translate-y-2' : ''
  }`} />
  <span className={`block w-6 h-0.5 my-0.5 rounded-full scale-115 bg-black dark:bg-white transition-all duration-330 my-1 ${
    isMenuOpen ? 'opacity-0 scale-x-0' : ''
  }`} />
  <span className={`block w-6 h-0.5 my-0.5 rounded-full scale-115 bg-black dark:bg-white transition-all duration-330 ${
    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
  }`} />
</button>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-40 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1 p-10 mt-15">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl py-2 transition-all ${
                isActive(item.path)
                  ? 'text-black dark:text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-8 left-8 z-50 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
        aria-label="Toggle theme"
      >
        <div className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors">
          <div
            className={`absolute top-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full shadow-md transition-transform duration-300 ${
              theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
            }`}
          >
            {theme === 'dark' ? (
              <Moon size={12} className="absolute top-0.5 left-0.5 text-yellow-400" />
            ) : (
              <Sun size={12} className="absolute top-0.5 left-0.5 text-yellow-500" />
            )}
          </div>
        </div>
      </button>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/60 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pb-32">
        <Outlet />
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-4 shadow-lg">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-all hover:scale-110 ${
                    isActive(item.path)
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  aria-label={item.label}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}