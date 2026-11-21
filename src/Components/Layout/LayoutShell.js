"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar/navbar";
import Footer from "@/Components/Footer/footer";
import ScrollToTopButton from "@/app/_components/ScrollToTopButton/ScrollToTopButton";
import QuoteModal from "@/Components/Quote/QuoteModal";

import { RouteStatusProvider } from "@/context/RouteStatusContext";

export default function LayoutShell({ children, initialInactiveRoutes = [] }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <RouteStatusProvider initialInactiveRoutes={initialInactiveRoutes}>
      {!isAdminRoute && <Navbar />}
      <main className="w-full max-w-full overflow-x-clip">{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
      {!isAdminRoute && <QuoteModal />}
    </RouteStatusProvider>
  );
}
