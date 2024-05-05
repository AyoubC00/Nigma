import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { ...axios.defaults.headers, "Content-Type": "application/json" },
    withCredentials: true,
})

API.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"

API.interceptors.response.use(config => config, error => {
    if (error.response.status === 401)
    {
        localStorage.removeItem("token")
        window.location.href="/login"
        return Promise.reject({ status: "failure", messages: "Please login to continue with your request" })
    }
    else if (error.response.status === 422)
    {
        return Promise.reject({ status: "failure", messages: error.response.data.errors })
    }
    return Promise.reject(error)
})

// Get csrf token if not already set on POST, PUT, PATCH and DELETE reuqests
API.interceptors.request.use(config => {
    const token = JSON.parse(`${localStorage.getItem("token")}`)
    config.headers["Authorization"] = `Bearer ${token}`
    // const { token } = useAuth();
    // if (
    //     config.method 
    //     && ["post", "put", "patch", "delete"].includes(config.method)
    //     && !/XSRF-TOKEN/.test(document.cookie)
    // )
    // {
    //     await axios.get(
    //         `${import.meta.env.VITE_BASE_URL}sanctum/csrf-cookie`,
    //         {
    //             withCredentials: true,
    //             withXSRFToken: true,
    //         }
    //     )
    // }
    return config
}, error => Promise.reject(error))

export default API