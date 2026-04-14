import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./assets/css/app.min.css";
import "./assets/css/custom.css";
import "./assets/css/theme-dark.css";
import AppShell from "@/components/layout/AppShell";
import { ThemeProvider } from "@/providers/theme-provider"

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html
      lang="en"
      suppressHydrationWarning
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
      <body suppressHydrationWarning>
        
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <AppShell>   
            {children}
            </AppShell>
          </ThemeProvider>
         
      </body>
    </html>
  );
}
