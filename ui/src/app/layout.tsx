import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Employee List",
  description: "Employee list powered by FastAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
