import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { Box } from "@mui/material"
import Footer from "../sections/Footer/Footer"

const HomeLayout = () =>
{
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100svh" }}>
            <Navbar />
            <Box sx={{ pt: { xs: 7, sm: 8 } }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}

export default HomeLayout