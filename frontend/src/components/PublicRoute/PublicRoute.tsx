import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const PublicRoute = () =>
{
    const { token } = useAuth()
    return token === null ? <Outlet /> : <Navigate to="/" replace />
}

export default PublicRoute