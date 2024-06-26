import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

interface IAuthContext {
    token: string | null
    user: IUser | null
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
    user: null,
    login: () => null,
    register: () => null,
    logout: () => null,
    clientLogout: () => null
})

export const AuthContextProvider:React.FC<{children:React.ReactNode}> = ({ children }) =>
{
    const [tokenStorage, setTokenStorage] = useState<string | null>(JSON.parse(`${localStorage.getItem("token")}`))
    const [userStorage, setUserStorage] = useState<IUser | null>(JSON.parse(`${localStorage.getItem("user")}`))
    const [token, setToken] = useState<string | null>(tokenStorage)
    const [user, setUser] = useState<IUser | null>(userStorage)
    useEffect (() => {
        setToken(tokenStorage)
        setUser(userStorage)
    }, [tokenStorage, userStorage])
    const login = async (credentials: ICredentials) =>
    {
        try
        {
            const response = await API.post(`login`, credentials)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setTokenStorage(response.data.token)
            setUserStorage(response.data.user)
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
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setTokenStorage(null)
        setUserStorage(null)
    }
    return (
        <AuthContext.Provider value={{ login, register, logout, token, user, clientLogout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)