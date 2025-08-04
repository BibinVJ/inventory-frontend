import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { useRoutes } from "react-router";
import "nprogress/nprogress.css";
import "./nprogress-custom.css";
import PublicRoute from "./services/PublicRoute";
import PrivateRoute from "./services/PrivateRoute";

import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import { useAuth } from "./hooks/useAuth";
// import { useAuth } from "./context/AuthContext";


const Dashboard = lazy(() => import("./pages/Dashboard/Home"));
const Customers = lazy(() => import("./pages/Customer/Customers"));
const Vendors = lazy(() => import("./pages/Vendor/Vendors"));
const Purchases = lazy(() => import("./pages/Purchase/Purchases"));
const Categories = lazy(() => import("./pages/Inventory/Categories"));
const Units = lazy(() => import("./pages/Inventory/Units"));
const Items = lazy(() => import("./pages/Inventory/Items"));
const AddPurchase = lazy(() => import("./pages/Purchase/AddPurchase"));
const EditPurchase = lazy(() => import("./pages/Purchase/EditPurchase"));
const ViewPurchase = lazy(() => import("./pages/Purchase/ViewPurchase"));
const UserProfiles = lazy(() => import("./pages/UserProfiles"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Blank = lazy(() => import("./pages/Blank"));
const FormElements = lazy(() => import("./pages/Forms/FormElements"));
const BasicTables = lazy(() => import("./pages/Tables/BasicTables"));
const Alerts = lazy(() => import("./pages/UiElements/Alerts"));
const Avatars = lazy(() => import("./pages/UiElements/Avatars"));
const Badges = lazy(() => import("./pages/UiElements/Badges"));
const Buttons = lazy(() => import("./pages/UiElements/Buttons"));
const Images = lazy(() => import("./pages/UiElements/Images"));
const Videos = lazy(() => import("./pages/UiElements/Videos"));
const LineChart = lazy(() => import("./pages/Charts/LineChart"));
const BarChart = lazy(() => import("./pages/Charts/BarChart"));
const Sales = lazy(() => import("./pages/Sales/Sales"));
const AddSale = lazy(() => import("./pages/Sales/AddSale"));
const EditSale = lazy(() => import("./pages/Sales/EditSale"));
const ViewSale = lazy(() => import("./pages/Sales/ViewSale"));
const Users = lazy(() => import("./pages/UserManagement/Users"));
const Roles = lazy(() => import("./pages/RoleManagement/Roles"));
const AddRole = lazy(() => import("./pages/RoleManagement/AddRole"));
const EditRole = lazy(() => import("./pages/RoleManagement/EditRole"));


const AppRoutes = () => {
  const routes = useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <AppLayout />,
          children: [
            // inventory
            { index: true, element: <Dashboard /> },
            { path: "inventory/categories", element: <Categories /> },
            { path: "inventory/units", element: <Units /> },
            { path: "inventory/items", element: <Items /> },

            // sales
            { path: "customers", element: <Customers /> },
            { path: "sales", element: <Sales /> },
            { path: "sales/add", element: <AddSale /> },
            { path: "sales/edit/:id", element: <EditSale /> },
            { path: "sales/:id", element: <ViewSale /> },

            // purchases
            { path: "vendors", element: <Vendors /> },
            { path: "purchases", element: <Purchases /> },
            { path: "purchases/add", element: <AddPurchase /> },
            { path: "purchases/edit/:id", element: <EditPurchase /> },
            { path: "purchases/:id", element: <ViewPurchase /> },

            // others
            { path: "profile", element: <UserProfiles /> },
            { path: "calendar", element: <Calendar /> },
            { path: "blank", element: <Blank /> },
            { path: "form-elements", element: <FormElements /> },
            { path: "basic-tables", element: <BasicTables /> },
            { path: "alerts", element: <Alerts /> },
            { path: "avatars", element: <Avatars /> },
            { path: "badge", element: <Badges /> },
            { path: "buttons", element: <Buttons /> },
            { path: "images", element: <Images /> },
            { path: "videos", element: <Videos /> },
            { path: "line-chart", element: <LineChart /> },
            { path: "bar-chart", element: <BarChart /> },
            { path: "users", element: <Users /> },
            { path: "roles", element: <Roles /> },
            { path: "roles/add", element: <AddRole /> },
            { path: "roles/edit/:id", element: <EditRole /> },
          ],
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

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
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
