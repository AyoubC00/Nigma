import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import { Box } from "@mui/material"
import DashboardNav from "../../components/DashboardNav/DashboardNav"

const DashboardLayout = () =>
{
    return (
        <Box sx={{ display: "flex", gap: 2, pl: { md: 32 } }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1 }}>
                <DashboardNav />
                <Outlet />
            </Box>
        </Box>
    )
}

export default DashboardLayout