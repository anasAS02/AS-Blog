import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './Components/Header';
import { GlobalContextProvider } from './Context/UserContext';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzsc5MXj3rMckpCfjPCoZOHudjcLAK2cQ",
  authDomain: "as-blog-570e6.firebaseapp.com",
  projectId: "as-blog-570e6",
  storageBucket: "as-blog-570e6.appspot.com",
  messagingSenderId: "773763620910",
  appId: "1:773763620910:web:05aa0af615c1cbec5dffbf",
  measurementId: "G-STMGV3N5ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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

  return (
    <html lang="en">
      
      <body className={inter.className}>
        <GlobalContextProvider>
          <Header />
          {children}
          <footer className='w-full h-14 bg-zinc-100 opacity-90 flex items-center justify-center'>
            <p className='text-black text-1xl max-md:text-sm'>Copyrights reserved to <span className='font-bold text-red-500'>Anas</span> - 2023&copy;</p>
          </footer>
        </GlobalContextProvider>
      </body>
    </html>
  )
}

