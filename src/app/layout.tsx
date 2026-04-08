import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./assets/css/app.min.css";
import "./assets/css/custom.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlueConnects",
  description: "BlueConnects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&amp;display=swap"
        />
      </head>
      <body data-sidebar="light">
        <div id="layout-wrapper">
          <Header />
          <Sidebar />
          <div className="main-content">

<div className="page-content">

    <div className="parent-wrapper">
          <main className="flex-1">{children}</main>
        </div>
  </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
