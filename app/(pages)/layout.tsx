import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardHeader } from "../components/dashboardComp/DashboardHeader";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><DashboardHeader />{children}</body>
    </html>
  );
}
