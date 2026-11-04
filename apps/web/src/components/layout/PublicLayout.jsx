import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../common/Header.jsx";
import { Footer } from "../common/Footer.jsx";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased transition-colors">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

