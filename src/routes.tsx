import AuthGuard from "components/authentication/AuthGuard";
import GuestGuard from "components/authentication/GuestGuard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import LoadingScreen from "components/LoadingScreen";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

const BankList = Loadable(
  lazy(() => import("./pages/userManagement/BankList"))
);
const UserGrid = Loadable(
  lazy(() => import("./pages/userManagement/UserGrid"))
);
const TransactionList = Loadable(
  lazy(() => import("./pages/userManagement/TransactionList"))
);

const Error = Loadable(lazy(() => import("./pages/404")));

const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "forget-password",
    element: (
      <GuestGuard>
        <ForgetPassword />
      </GuestGuard>
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },

      {
        path: "account-list",
        element: <BankList />,
      },
      {
        path: "user-grid",
        element: <UserGrid />,
      },
      {
        path: "transaction-list",
        element: <TransactionList />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
