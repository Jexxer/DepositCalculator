import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { axiosInstance } from "@/Axios";
import { loginSuccess } from "@/Redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { children } = props;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axiosInstance.get("check-token", {
          withCredentials: true,
        });
        if (res.status === 200) dispatch(loginSuccess(res.data));
        else navigate("/login");
      } catch (err) {
        navigate("/login");
      }
    };

    if (!isAuthenticated) {
      checkToken();
    }
  }, [isAuthenticated, dispatch, navigate]);

  return isAuthenticated && <>{children}</>;
};

export default ProtectedRoute;
