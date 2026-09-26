import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";
export const metadata = { title: "FitLog", description: "test" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-base font-body text-white antialiased">
        <PlanProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
          </ToastProvider>
        </PlanProvider>
      </body>
    </html>
  );
}
