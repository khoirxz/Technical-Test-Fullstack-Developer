import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import FormPage from "./pages/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <FormPage />,
  },
  {
    path: "/edit/:id",
    element: <FormPage />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
