import { useAuth } from "./Context";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// const { authorization } = JSON.parse(localStorage.getItem("authorization"));

export const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    MySwal.fire({
      icon: "error",
      title: "請重新登入",
    });
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
