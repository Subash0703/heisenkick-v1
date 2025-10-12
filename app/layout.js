import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "HeisenKick",
  description: "Tamil Nadu first Affordable football online jersey store exclusively for football fans REAL MADRID, BARCELONA, MANCHESTER UNITED, LIVERPOOL, CHELSEA, ARSENAL, JUVENTUS, INTER MILAN, AC MILAN, PSG, BAYERN MUNICH and many more club & national team jersey",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className="bg-gray-50 text-gray-800">
      <Navbar />
      <main>{children}</main>
    </body>
  </html>
);

export default RootLayout;