import localFont from "next/font/local";
import "./globals.css";

const NTSomicFont = localFont({ src: "NTSomic.woff2" });

export const metadata = {
  title: "classWork",
  description: "classWork",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={NTSomicFont.className}
      >
      <main>
        {children}
      </main>
      </body>
    </html>
  );
}
