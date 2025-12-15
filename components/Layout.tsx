import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Menu, X, Sun, Moon, Home } from 'lucide-react';
import { clsx } from 'clsx';
import { AdsterraBanner } from './AdsterraBanner';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'landing' | 'analyzer' | 'builder' | 'blog';
  onNavigate: (page: 'landing' | 'analyzer' | 'builder' | 'blog', slug?: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or local storage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const NavItem = ({ page, icon: Icon, label }: { page: 'landing' | 'analyzer' | 'builder', icon: any, label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsSidebarOpen(false);
      }}
      className={clsx(
        "flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
        currentPage === page
          ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      )}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-20">
        <div className="font-bold text-xl text-primary-600 dark:text-primary-400">ResumeAI</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 dark:text-gray-300">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block shadow-lg lg:shadow-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">ResumeAI</span>
            <button onClick={toggleTheme} className="hidden lg:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem page="landing" icon={Home} label="Home" />
            <NavItem page="analyzer" icon={LayoutDashboard} label="Resume Analyzer" />
            <NavItem page="builder" icon={FileText} label="Resume Builder" />
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all flex flex-col">
          
          {/* 2️⃣ DESKTOP TOP BANNER (728x90) - Only visible on Large Screens */}
          <div className="hidden lg:flex w-full justify-center py-4 bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 min-h-[100px]">
             <AdsterraBanner 
               width={728} 
               height={90} 
               scriptUrl="https://www.highperformanceformat.com/26aa998c7f8f500763ab79ff28f6e548/invoke.js"
               atOptions={{
                 'key' : '26aa998c7f8f500763ab79ff28f6e548',
                 'format' : 'iframe',
                 'height' : 90,
                 'width' : 728,
                 'params' : {}
               }}
             />
          </div>

          <div className={clsx(
            "flex-1",
            currentPage !== 'landing' && "p-4 lg:p-8"
          )}>
            {children}
          </div>

          {/* Spacer for Mobile Bottom Ad */}
          <div className="h-[60px] lg:hidden w-full shrink-0"></div>
        </main>
      </div>

      {/* 1️⃣ MOBILE BOTTOM BANNER (320x50) - Only visible on Mobile (< 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 dark:border-gray-700 flex justify-center items-center p-1">
        <AdsterraBanner 
          width={320} 
          height={50} 
          closeable={true}
          scriptUrl="https://www.highperformanceformat.com/2ce8af569998ad9deec21056f958bdd6/invoke.js"
          atOptions={{
            'key' : '2ce8af569998ad9deec21056f958bdd6',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          }}
        />
      </div>
    </div>
  );
};
