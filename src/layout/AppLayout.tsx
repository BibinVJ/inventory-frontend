import { useEffect } from "react";
import { SidebarProvider } from "../context/SidebarContext.tsx";
import { useSidebar } from "../hooks/useSidebar";
import { Outlet, useLocation } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, isFullScreen, enterFullScreen, exitFullScreen } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    const shouldGoFullScreen = location.state?.goFullScreen;
    if (shouldGoFullScreen) {
      enterFullScreen();
    } else {
      if (isFullScreen) {
        exitFullScreen();
      }
    }
  }, [location, isFullScreen, enterFullScreen, exitFullScreen]);

  if (isFullScreen) {
    return (
      <div className="min-h-screen">
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
