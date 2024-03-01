import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    inverted: boolean;
    children: React.ReactNode;
    requiredRoles?: string[];
  }
 
  interface UserData {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
  }
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);

  const PrivateRoute = ({ inverted, children,requiredRoles }: PrivateRouteProps) => {

    const [ISADMIN, setISADMIN] = useState(false);

    useEffect(() => {
      // Retrieve user data from localStorage when the component mounts or user data changes
      const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
      const isAdmin = userDataObject?.user?.isAdmin || false;
      setISADMIN(isAdmin);
    }, []); 



    const access_token = localStorage.getItem("access_token");
    console.log(access_token)
    const isAuthenticated = access_token ? true : false;
    if(inverted){
      return isAuthenticated ? <Navigate to = "/"/> :children;
    }
    console.log("isamdin" , ISADMIN)
    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = ISADMIN ? ['admin'] : ['customer'];
      const hasRequiredRoles = requiredRoles.some(role => userRoles.includes(role));
      if (!hasRequiredRoles) {
        return <Navigate to="/forbidden" />;
      }
    }
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  export default PrivateRoute;
