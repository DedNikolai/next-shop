import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import { LoginModalProvider } from "./components/LoginModalContext";
import { RegistrationModalProvider } from "./components/RegistrationModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link data-rh="true" rel="icon" href="/logo.png" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LoginModalProvider>
            <RegistrationModalProvider>
              {children}
            </RegistrationModalProvider>
          </LoginModalProvider>
        </Providers>
      </body>
    </html>
  );
}
