import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBTI RAG",
  description: "A personality assessment interface built with Next.js",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
