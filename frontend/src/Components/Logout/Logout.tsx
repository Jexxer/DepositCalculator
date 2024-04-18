import { axiosInstance } from "@/Axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      await axiosInstance.get("/check-token/logout");
      navigate("/");
    };
    logout();
  }, [navigate]);

  return <div></div>;
};

export default Logout;
