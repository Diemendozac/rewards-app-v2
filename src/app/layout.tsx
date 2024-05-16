import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from '../context/AuthContext';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rewards App",
  description: "Redeem your rewards here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
