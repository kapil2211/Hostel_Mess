'use client';

import { useAuth } from '@/context/AuthContext';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
// import styles from "./navbar.module.css"

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  const navigation = !isLoggedIn
    ? [
      { name: 'Home', href: '/', current: false },
      { name: 'Login', href: '/login', current: false },
      { name: 'Signup', href: '/signup', current: false },
    ]
    : user?.role === 'student'
      ? [
        { name: 'Home', href: '/', current: false },
        { name: 'Student Dashboard', href: '/student/dashboard', current: false },
        { name: 'Profile', href: '/profile', current: false },
      ]
      : [
        { name: 'Home', href: '/', current: false },
        { name: 'Messowner Dashboard', href: '/messowner/dashboard', current: false },
        { name: 'Profile', href: '/profile', current: false },
      ];

  return (
    <Disclosure as="nav" >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center  sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    src="/images/IIT-BHU_Logo.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>

                {/* Desktop menu */}
                <div className="hidden sm:ml-auto sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-black-200 text-black'
                            : 'text-black-300 hover:bg-gray-100 hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile & Notifications */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isLoggedIn && (
                  <>
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                          alt=""
                        />
                      </Menu.Button>

                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu items */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
