import type { Metadata } from "next";
import { Space_Mono, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const firaCode = Fira_Code({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: "Atlas Ciber-Neón",
  description: "Geographic intelligence tool with cyberpunk-styled dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body>
        <div className="scanline-overlay"></div>
        <div className="grid-background">
          <Header />
          <main style={{ flex: 1, paddingTop: '64px' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
