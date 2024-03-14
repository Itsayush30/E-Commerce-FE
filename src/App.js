import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Registration from "./components/Registration";
import ProductPage from "./components/ProductPage";
import Body from "./components/Body";
import ProductDetail from "./components/ProductDetail";

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
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "/productdetail/:id",
        element: <ProductDetail />,
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
