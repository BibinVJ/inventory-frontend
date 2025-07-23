import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { useRoutes } from "react-router";
import "nprogress/nprogress.css";
import "./nprogress-custom.css";

import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import PublicRoute from "./services/PublicRoute";
import PrivateRoute from "./services/PrivateRoute";
import AddPurchase from "./pages/Purchase/AddPurchase";
import EditPurchase from "./pages/Purchase/EditPurchase";
import ViewPurchase from "./pages/Purchase/ViewPurchase";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Sales from "./pages/Sales/Sales";
import AddSale from "./pages/Sales/AddSale";

const Dashboard = lazy(() => import("./pages/Dashboard/Home"));
const Customers = lazy(() => import("./pages/Customer/Customers"));
const Vendors = lazy(() => import("./pages/Vendor/Vendors"));
const Purchases = lazy(() => import("./pages/Purchase/Purchases"));
const Categories = lazy(() => import("./pages/Inventory/Categories"));
const Units = lazy(() => import("./pages/Inventory/Units"));
const Items = lazy(() => import("./pages/Inventory/Items"));

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
  return (
    <>
      <Toaster richColors position="top-right" closeButton={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </>
  );
}

export default App;
