import "./globals.css";
import { Inter } from "next/font/google";
import Chat from "@/components/Chat";
import Provideres from "@/components/Provideres";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book-Store",
  description: "Your Bookstore for fantasy & mystery novels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provideres>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Provideres>
    </html>
  );
}
