'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react'; // You can use Heroicons or others too

const Navbar = () => {
  const pathname = usePathname();
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!user;

  const logout = async () => {
    await fetch('/api/users/logout');
    setUser(null);
    window.location.href = '/login';
  };

  const navItems = !isLoggedIn
    ? [
        { name: 'Home', href: '/' },
        { name: 'Login', href: '/login' },
        { name: 'Signup', href: '/signup' },
      ]
    : user?.role === 'Student'
    ? [
        { name: 'Cart', href: '/student/view_cart' },
        { name: 'Menu', href: '/student/view_menu' },
        { name: 'Profile', href: '/profile' },
      ]
    : [
        { name: 'Add_menu', href: '/messowner/add_menu' },
        { name: 'Billing', href: '/messowner/bill' },
        { name: 'Orders', href: '/messowner/orders' },
        { name: 'Profile', href: '/profile' },
      ];

  return (
    <nav className="sticky top-0 z-50  bg-white shadow-md rounded-full mx-4 px-6 py-2 flex items-center justify-between transition-all duration-200">
      <div className="flex items-center space-x-2">
        <Link href="/" className="text-xl font-bold text-orange-600">
          🍽️ MessMate  {user?.role}
        </Link>
      </div>

      <div className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium ${
              pathname === item.href ? 'text-orange-600' : 'text-gray-700 hover:text-orange-500'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {isLoggedIn && (
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-700 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-orange-500">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-4 right-4 bg-white shadow-lg rounded-xl py-4 px-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm font-medium ${
                pathname === item.href ? 'text-orange-600' : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
