'use client';

import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  BeakerIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Playground', href: '/dashboard/playground', icon: BeakerIcon },
  { name: 'Help & Support', href: '/dashboard/help', icon: QuestionMarkCircleIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.png"
                alt="QueryIt AI Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold text-[#2861eb]">QueryIt</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-3 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200"
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <Bars3Icon className="h-5 w-5 text-gray-500" />
          )}
        </button>

        <nav className="mt-8 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-3 mb-1 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2861eb] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!sidebarOpen && 'justify-center'}`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content wrapper */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 mt-16 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Main content */}
        <main className="flex-1 p-6 min-h-[calc(100vh-8rem)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 w-full">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
            <p> {new Date().getFullYear()} QueryIt AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
