import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./Provider";
import Sidebar from "@/components/common/Sidebar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { Logout } from "@/components/auth/Logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          {
            session?.user ?
              <main className="grid min-h-screen gap-0 lg:grid-cols-[280px_1fr]">
                <Sidebar />
                {children}
              </main>
              :
              <main>
                {children}
              </main>
          }
        </body>
      </Provider>
    </html>
  );
}
