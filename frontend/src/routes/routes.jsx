// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import Register2 from "../components/Register2";
import ProtectedRoute from "../routes/PrivateRoute";
import Home from "../components/Home";
import Read from "../components/Read";
import Login from "../components/Login";
import Login2 from "../components/Login2";
import Update from "../components/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/read/:id",
    element: (
      <ProtectedRoute>
        <Read />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <ProtectedRoute>
        <Update />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login2",
    element: <Login2 />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register2",
    element: <Register2 />,
  },
]);

export default router;
