import { useState } from "react";
import { Outlet } from "react-router";

import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function openMobileSidebar() {
    setMobileSidebarOpen(true);
  }

  function closeMobileSidebar() {
    setMobileSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <MobileSidebar isOpen={mobileSidebarOpen} onClose={closeMobileSidebar} />

      <div className="min-h-screen lg:pl-64">
        <Topbar onOpenSidebar={openMobileSidebar} />

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
