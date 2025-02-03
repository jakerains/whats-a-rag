import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Book, Layout, Settings as SettingsIcon, Cpu } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(`/admin/${path}`);
  };

  const navItems = [
    { path: 'modules', label: 'Modules', icon: Layout },
    { path: 'templates', label: 'Templates', icon: Book },
    { path: 'components', label: 'AI Components', icon: Cpu },
    { path: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">AI Learning Admin</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={`/admin/${path}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive(path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 