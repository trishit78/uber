import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token)

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return <>{children}</>;
};

export default AuthWrapper;
