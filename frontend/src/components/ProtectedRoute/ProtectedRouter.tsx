import { useAuth } from "../../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRouter = () =>
{
    const { token } = useAuth()
    return token === null ? <Navigate to="/login" replace /> : <Outlet />
}

export default ProtectedRouter