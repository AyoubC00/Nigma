import { Box } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Outlet } from "react-router-dom"

const PlayGround = () =>
{
    return (
        <Box sx={{ bgcolor: blue[500], width: 1, height: "100svh" }}>
            <Outlet />
        </Box>
    )
}

export default PlayGround