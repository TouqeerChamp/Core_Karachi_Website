import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CORE Karachi | High-Performance Gym & Conditioning at Ocean Tower",
  description: "Elevate your performance 14 stories above the city. CORE Karachi offers elite strength training, athletic conditioning, and personal coaching in Clifton, Karachi.",
  keywords: "Gym in Clifton, CORE Karachi, Fitness Karachi, Ocean Tower Gym, Personal Training Karachi, Strength and Conditioning",
  icons: {
    icon: "/icon.webp",
  },
  openGraph: {
    title: "CORE Karachi | High-Performance Gym & Conditioning at Ocean Tower",
    description: "Elevate your performance 14 stories above the city. CORE Karachi offers elite strength training, athletic conditioning, and personal coaching in Clifton, Karachi.",
    url: "https://corekarachi.com",
    siteName: "CORE Karachi",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "CORE Karachi Gym - High-Performance Training",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CORE Karachi | High-Performance Gym & Conditioning at Ocean Tower",
    description: "Elevate your performance 14 stories above the city. CORE Karachi offers elite strength training, athletic conditioning, and personal coaching in Clifton, Karachi.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
