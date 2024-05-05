import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

interface IAuthContext {
    token: string | null
    login: (credentials: ICredentials) => Promise<AuthResponse<ILogin>> | null
    register: (data: IUserData) => Promise<AuthResponse<IRegister>> | null
    logout: () => Promise<AuthResponse<unknown>> | null
    clientLogout: () => void | null
}

type AuthResponse<T> = 
    | { status: "success", data: T }
    | { status: "failure", messages: T }

const AuthContext = createContext<IAuthContext>({
    token: null,
    login: () => null,
    register: () => null,
    logout: () => null,
    clientLogout: () => null
})

export const AuthContextProvider:React.FC<{children:React.ReactNode}> = ({ children }) =>
{
    const [storage, setStorage] = useState<string | null>(JSON.parse(`${localStorage.getItem("token")}`))
    const [token, setToken] = useState<string | null>(storage)
    useEffect (() => {
        setToken(storage)
    }, [storage])
    const login = async (credentials: ICredentials) =>
    {
        try
        {
            const response = await API.post(`login`, credentials)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            setStorage(response.data.token)
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const register = async (data: IUserData) =>
    {
        try
        {
            const response = await API.post(`register`, data)
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const logout = async () =>
    {
        try
        {
            const response = await API.post(`logout`)
            clientLogout()
            return response.data
        }
        catch (error)
        {
            return error
        }
    }
    const clientLogout = () => {
        console.log("Logging out")
        localStorage.removeItem("token")
        setStorage(null)
    }
    return (
        <AuthContext.Provider value={{ login, register, logout, token, clientLogout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)