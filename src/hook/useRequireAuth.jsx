import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";


const useRequireAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = () => {
    if (!user) {
      navigate("/login", { state: location.pathname });
      return false;
    }
    return true;
  };

  return requireAuth;
};

export default useRequireAuth;
