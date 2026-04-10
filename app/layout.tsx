import type { Metadata } from "next";
import { getMenuConfig } from "@/lib/config";
import "./globals.css";
import Header from "./components/Header";
import NoticesCarousel from "./components/Notice";
import FilterBar from "./components/Filters";
import ItemLayout from "./components/ItemLayout";


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
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Header cafeName={config.cafe.name} />
        <NoticesCarousel notices={config.notices} />
        <FilterBar filter_categories={config.filter_categories} filter_chips={config.filter_chips} />
        <ItemLayout items={config.items} />
        {children}
      </body>
    </html>
  );
}
