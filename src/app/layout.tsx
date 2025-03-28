import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TCGP Exchange",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className={"mainContainer"}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
