// layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Signup Form',
  description: 'Signup page using Next.js and MongoDB',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
