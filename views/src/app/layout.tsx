import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VLibrasComponent from "./home/components/vlibras";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LRM - Sistema de Gestão",
  description: "Sistema de gestão de medicamentos e agendamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <VLibrasComponent />
      </body>
    </html>
  );
}
