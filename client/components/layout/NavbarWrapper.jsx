'use client';

import { usePathname } from 'next/navigation';
import { PageTransition } from '../animations/PageTransition';
import { Navbar } from '../landing/Navbar';

export function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || 
                     pathname?.startsWith('/register') || 
                     pathname?.startsWith('/auth');
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
