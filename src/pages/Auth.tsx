
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <AuthForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Auth;
