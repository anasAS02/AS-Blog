import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './Components/Header';
import { GlobalContextProvider } from './Context/UserContext';

const inter = Inter({
  weight: ["200", "300", "500", "700", "800", "900"],
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'AS-Blog',
  description: 'AS-Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const date = new Date();
  let year = date.getFullYear();

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Header />
          {children}
          <footer className='w-full h-14 bg-zinc-100 opacity-90 flex items-center justify-center'>
            <p className='text-black text-1xl max-md:text-sm'>Copyrights reserved to <span className='font-bold text-red-500'>Anas</span> - {year}&copy;</p>
          </footer>
        </GlobalContextProvider>
      </body>
    </html>
  )
}

