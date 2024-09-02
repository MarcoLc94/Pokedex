import { Navigate, Outlet } from "react-router-dom"


export const ProtectedRoute = ({isLogged}) => {
  if (isLogged) { 
    return <Outlet/>
  } else {
    return <Navigate to="/"/>
  }
}
