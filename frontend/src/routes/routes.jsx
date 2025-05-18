// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import ProtectedRoute from "../routes/PrivateRoute";
import Home from "../components/Home";
import Login from "../components/Login";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
