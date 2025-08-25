import { Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import "nprogress/nprogress.css";
import "./nprogress-custom.css";
import { useAuth } from "./hooks/useAuth";
import AppRouter from "./router";

function App() {
  const { logout } = useAuth();
  useEffect(() => {
    const handleLogout = () => logout();
    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, [logout]);
  
  return (
    <>
      <Toaster richColors position="top-center" closeButton={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouter />
      </Suspense>
    </>
  );
}

export default App;
