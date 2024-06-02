import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import UserQuizzes from "./pages/UserQuizzes/UserQuizzes";
import Quiz from "./pages/Quiz/Quiz";
import ProtectedRouter from "./components/ProtectedRoute/ProtectedRouter";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import PlayGround from "./pages/PlayGround/PlayGround";
import EditQuiz from "./pages/EditQuiz/EditQuiz";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "",
                element: <PublicRoute />,
                children: [
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/register",
                        element: <Register />
                    },
                ]
            },
        ]
    },
    {
        path: "/playground",
        element: <ProtectedRouter />,
        children: [
            {
                path: "",
                element: <PlayGround />,
                children: [
                    {
                        path: "quiz/:quiz_id",
                        element: <Quiz />
                    }
                ]
            },
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRouter />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "quizzes",
                        element: <UserQuizzes />,
                    },
                    {
                        path: "quizzes/create",
                        element: <CreateQuiz />
                    },
                    {
                        path: "quizzes/:quiz_id/edit",
                        element: <EditQuiz />
                    }
                ]
            }
        ]
    },
])

export default router