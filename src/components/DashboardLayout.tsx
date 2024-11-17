import React from 'react';
import { Menu, Bell, Settings, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function DashboardLayout({ children, currentPage, setCurrentPage }: DashboardLayoutProps) {
  const menuItems = ['Dashboard', 'Patients', 'Monitoring', 'Analytics', 'Tasks', 'Messages'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">HP</span>
          </div>
          <span className="font-semibold text-gray-800">HealthPulse AI</span>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item}>
                <button 
                  onClick={() => setCurrentPage(item)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Aqeel</h1>
            <p className="text-gray-600">Here's your practice overview</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}