'use client';

import { Sidebar } from './Sidebar';
import { DashboardHeader } from './Header';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-[280px] transition-all duration-300">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
