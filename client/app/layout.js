import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { NavbarWrapper } from '../components/layout/NavbarWrapper';
import { ToastProvider } from '../components/ui/Toast';
import { PageTransition } from '../components/animations/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata = {
  title: 'HabitOS - Run your life like software',
  description: 'AI-powered habit tracking, analytics, and life intelligence platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background transition-colors duration-300`}>
        <ThemeProvider>
          <ToastProvider>
            <NavbarWrapper>
              <PageTransition>
                {children}
              </PageTransition>
            </NavbarWrapper>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
