"use client";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";

const RobotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // Obtén el router de Next.js
  const pathname = usePathname(); // Obtén la ruta actual

  const links = [
    { name: "login", href: "/" },
    { name: "admin", href: "/admin" },
  ];
  const styleButton =
    "w-[100px] h-auto px-3 py-2  bg-guille_color4 grid place-content-center text-base text-guille_color2 hover:text-cremaDev transition-colors ease-linear delay-100 duration-300 [clip-path:polygon(20%_0,100%_0%,80%_100%,0%_100%)]";
  // const pathname = usePathname()

  return (
    <html lang="en">
      <body className={RobotoMono.className}>
        <Providers>
          <main className="w-full min-h-screen h-auto  flex flex-col justify-center  items-center gap-1 ">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
