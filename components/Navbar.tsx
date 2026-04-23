'use client';

import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 dark:bg-gray-950 shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#top" className="text-white hover:text-blue-400 transition-colors">
          About me
        </a>
        <a href="#mainProjects" className="text-white hover:text-blue-400 transition-colors">
          Projects
        </a>
        <button
          onClick={toggleTheme}
          className="relative w-16 h-9 bg-gray-300 dark:bg-gray-600 rounded-full border border-gray-700 dark:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
          aria-label="Toggle theme"
        >
          <span
            className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
              theme === 'dark' ? 'translate-x-7' : ''
            }`}
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </nav>
  );
}
