// protectedRoute.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../auth/authContext";

const ProtectedRoute = (WrappedComponent: React.FC) => {
  const Component: React.FC = (props) => {
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
      if (!isLoggedIn) {
        router.replace("/Account/SignIn");
      } else {
        router.beforePopState(() => {
          router.replace("/Account/SignIn");
          return false;
        });
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return Component;
};

export default ProtectedRoute;
