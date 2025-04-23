import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hashtag AI",
  description: "An automated AI platform that mines digital assets and generates passive income with minimal effort. Smart, secure, and efficient money mining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          {children}
        </Suspense>
        <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                className: ' toast',
                 style: {
                   border: '1px solid #27272a',
                   padding: '16px',
                   color: ' white',
                   backgroundColor: '#000000',
                   fontSize: '.8rem'
                 },
                 success: {
                  style: {
                    
                  },
                },
              }}
              
            />
      </body>
    </html>
  );
}
