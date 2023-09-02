import "@styles/globals.css";
import { Poppins } from "next/font/google";


const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Watch Online Anime, Free Anime Streaming Online On Anirealm",
  description:
    "Anirealm is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update. WATCH NOW!",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
