import { BrowserRouter as Router, Routes, Route } from "react-router";
import PublicRoute from "./services/PublicRoute";
import PrivateRoute from "./services/PrivateRoute";
import TopProgressBar from "./components/common/TopProgressBar";
import { Toaster } from "sonner";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Categories from "./pages/Inventory/Categories";
import Units from "./pages/Inventory/Units";
import Items from "./pages/Inventory/Items";
import Vendors from "./pages/Vendor/Vendors";
import Customers from "./pages/Customer/Customers";
import Purchases from "./pages/Purchase/Purchases";
import AddPurchase from "./pages/Purchase/AddPurchase";
import Sales from "./pages/Sales/Sales";
import AddSale from "./pages/Sales/AddSale";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import "./nprogress-custom.css";
import Blank from "./pages/Blank";


export default function App() {
  return (
    <>
      <Router>
        <TopProgressBar />
        <ScrollToTop />

        <Routes>
          {/* Dashboard Layout */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              
              {/* Inventory */}
              <Route path="/inventory/categories" element={<Categories />} />
              <Route path="/inventory/units" element={<Units />} />
              <Route path="/inventory/items" element={<Items />} />

              {/* People */}
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/customers" element={<Customers />} />

              {/* Transactions */}
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/purchases/add" element={<AddPurchase />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/add" element={<AddSale />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
