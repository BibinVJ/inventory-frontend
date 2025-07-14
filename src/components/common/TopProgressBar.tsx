import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function TopProgressBar() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 400); // tweak for feel

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
