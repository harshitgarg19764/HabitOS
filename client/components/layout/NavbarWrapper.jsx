'use client';

import { usePathname } from 'next/navigation';
import { PageTransition } from '../animations/PageTransition';
import { Navbar } from '../landing/Navbar';

export function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <>
      {isLandingPage && <Navbar />}
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
