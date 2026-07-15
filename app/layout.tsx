import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAP ECC FI/CO Sandbox Portfolio | Mateo Glibo",
  description:
    "A data-driven SAP ECC FI/CO sandbox portfolio with evidence packages, implementation roadmap, validations and SAP GUI screenshots.",
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
