
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-xl tracking-tight">ALEX<span className="text-indigo-600">CHEN</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
              <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#skills" className="hover:text-indigo-600 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
              <a href="#ai-tools" className="hover:text-indigo-600 transition-colors">AI Playground</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                Resume
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4 font-medium text-white">Let's connect & build reliable systems.</p>
          <div className="flex justify-center space-x-6 mb-8 text-sm">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Alex Chen. Built with React + Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};
