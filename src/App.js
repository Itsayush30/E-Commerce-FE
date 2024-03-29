import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Registration from "./components/Registration";
import AdminProductPage from "./components/AdminProductPage";
import UserProductPage from "./components/UserProductPage";
import Body from "./components/Body";
import AdminProductDetail from "./components/AdminProductDetail";
import UserProductDetail from "./components/UserProductDetail";
import PendingReview from "./components/PendingReview";
import PendingReviewDetail from "./components/PendingReviewDetail";
import UserProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";
import ImageUpload from "./components/EditImageUser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Registration />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "/admindashboard",
        element: <AdminProductPage />,
      },
      {
        path: "/userdashboard",
        element: <UserProductPage />,
      },
      {
        path: "/userProduct/:id",
        element: <UserProductDetail />,
      },
      {
        path: "/adminproduct/:id",
        element: <AdminProductDetail />,
      },
      {
        path: "/pendingreview",
        element: <PendingReview />,
      },
      {
        path: "/pendingreview/:id",
        element: <PendingReviewDetail />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/adminprofile",
        element: <AdminProfile />,
      },
      {
        path: "/uploadimage",
        element: <ImageUpload />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
