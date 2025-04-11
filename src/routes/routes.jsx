import { Dashboard } from "@/pages/Dashboard";
import {
  Products,
  AddProduct,
  Categories,
  StockManagements,
  StockAdjustments,
  StockIn,
  StockOut,
  Adjustment,
} from "@/pages/Products";
import { Customers, TransactionType } from "@/pages/Settings";
import { SalesHistory, SalesSummary } from "@/pages/Report";
import { Users, AddUser, EditUser } from "@/pages/Users";
import { Profile } from "@/pages/Profile";
import PageLayout from "@/layouts/PageLayout";
import {
  House,
  Users as UsersIcon,
  Box,
  ChartPie,
  Settings,
  CircleUser,
} from "lucide-react";
import { Navigate } from "react-router-dom";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <House className="h-4 w-4" />,
    component: Dashboard,
    showInMenu: true,
    roles: ["admin", "user"],
  },
  {
    name: "Products",
    path: "/products",
    icon: <Box className="h-4 w-4" />,
    component: PageLayout,
    showInMenu: true,
    roles: ["admin", "user"],
    children: [
      {
        name: "All Products",
        path: "/products",
        component: Products,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Add Products",
        path: "/products/add-product",
        component: AddProduct,
        showInMenu: false,
        roles: ["admin", "user"],
      },
      {
        name: "Categories",
        path: "/products/categories",
        component: Categories,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Stock Managements",
        path: "/products/stock-management",
        component: StockManagements,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Stock Adjustments",
        path: "/products/stock-adjustments",
        component: StockAdjustments,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Stock In",
        path: "/products/stock-in",
        component: StockIn,
        showInMenu: false,
        roles: ["admin", "user"],
      },
      {
        name: "Stock Out",
        path: "/products/stock-out",
        component: StockOut,
        showInMenu: false,
        roles: ["admin", "user"],
      },
      {
        name: "Adjustment",
        path: "/products/adjustment",
        component: Adjustment,
        showInMenu: false,
        roles: ["admin", "user"],
      },
    ],
  },
  {
    name: "Report",
    path: "/report",
    icon: <ChartPie className="h-4 w-4" />,
    component: PageLayout,
    showInMenu: true,
    roles: ["admin", "user"],
    children: [
      {
        name: "Sales Summary",
        path: "/report/sales-summary",
        component: SalesSummary,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Sales History",
        path: "/report/sales-history",
        component: SalesHistory,
        showInMenu: true,
        roles: ["admin", "user"],
      },
      {
        name: "Sales History",
        path: "/report",
        component: SalesSummary,
        showInMenu: false,
        roles: ["admin", "user"],
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-4 w-4" />,
    component: PageLayout,
    showInMenu: true,
    roles: ["admin"],
    children: [
      {
        name: "Customers",
        path: "/settings",
        component: () => <Navigate to="/dashboard" replace />,
        showInMenu: false,
        roles: ["admin"],
      },
      {
        name: "Customers",
        path: "/settings/customers",
        component: Customers,
        showInMenu: true,
        roles: ["admin"],
      },
      {
        name: "Transaction Type",
        path: "/settings/transaction-type",
        component: TransactionType,
        showInMenu: true,
        roles: ["admin"],
      },
    ],
  },
  {
    name: "Users",
    path: "/users",
    icon: <UsersIcon className="h-4 w-4" />,
    component: Users,
    showInMenu: true,
    roles: ["admin"],
  },
  {
    name: "Add Users",
    path: "/users/add-user",
    icon: <UsersIcon className="h-4 w-4" />,
    component: AddUser,
    showInMenu: false,
    roles: ["admin"],
  },
  {
    name: "Edit Users",
    path: "/users/edit-user/:id",
    icon: <UsersIcon className="h-4 w-4" />,
    component: EditUser,
    showInMenu: false,
    roles: ["admin"],
  },
  {
    name: "Edit Users",
    path: "/users/edit-user",
    icon: <UsersIcon className="h-4 w-4" />,
    component: () => <Navigate to="/users" replace />,
    showInMenu: false,
    roles: ["admin"],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <CircleUser className="h-4 w-4" />,
    component: Profile,
    showInMenu: true,
    roles: ["admin", "user"],
  },
];

export default routes;
