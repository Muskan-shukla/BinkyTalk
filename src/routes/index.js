import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";


// it basically a higher order component which is going to accept components and it wrap the component inside suspense and suspense is accepting loading screen which basically a component which is going to display loading screen 
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
  {
    path: "/auth",
    element: <MainLayout/>,
    children: [
      {element : <LoginPage/>, path:"login"},
      {element : <RegisterPage/>, path:"register"},
      {element : <ResetPasswordPage/>, path:"reset-password"},
      {element : <NewPasswordPage/>, path:"new-password"},
      {element : <VerifyPage/> , path:"verify"},
      ]
  },

    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        {path:"Settings" , element:<Settings/>},
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage/> },

        // if any visited in 404 then display the component page404 and this page is actually that you visited that page is no longer present in this application or not found 
        { path: "404", element: <Page404 /> },
        // if any one visited on any page then it navigated 404
        { path: "*", element: <Navigate to="/404" replace /> },

      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
  );
  const RegisterPage = Loadable(
    lazy(() => import("../pages/auth/Register")),
    );
    const ResetPasswordPage = Loadable(
      lazy(() => import("../pages/auth/ResetPassword")),
      );
      const NewPasswordPage = Loadable(
        lazy(() => import("../pages/auth/NewPassword")),
        );
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const ProfilePage=Loadable(lazy(() => import("../pages/dashboard/Profile")));
const VerifyPage = Loadable(lazy(() =>import("../pages/auth/Verify")))