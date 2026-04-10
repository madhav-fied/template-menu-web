import type { Metadata } from "next";
import type React from "react";
import { getMenuConfig } from "@/lib/config";
import { generateTheme } from "@/lib/theme";
import "./globals.css";
import Header from "./components/Header";
import NoticesCarousel from "./components/Notice";
import MenuView from "./components/MenuView";


export async function generateMetadata(): Promise<Metadata> {
  const config = getMenuConfig();
  return {
    title: config.cafe.name,
    description: "Our menu",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getMenuConfig();

  const themeVars = generateTheme(
    config.cafe.theme?.color1 ?? "#fdf6ec",
    config.cafe.theme?.color2 ?? "#2c1a0e",
    config.cafe.theme?.color3,
  );

  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col bg-cream text-espresso"
        style={themeVars as unknown as React.CSSProperties}
      >
        <Header cafeName={config.cafe.name} heroImage={config.cafe.hero_image} />
        <NoticesCarousel notices={config.notices} />
        <MenuView
          items={config.items}
          filterCategories={config.filter_categories}
          filterChips={config.filter_chips}
        />
        {children}
      </body>
    </html>
  );
}
