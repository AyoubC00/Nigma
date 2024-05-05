import { Box, Container, Typography } from "@mui/material"
import UserAvatar from "../UserAvatar/UserAvatar"
import { NavLink } from "react-router-dom"
import { blue } from "@mui/material/colors"

const DashboardNav = () =>
{
    const logoStyle = {
        textDecoration: "none",
    }
    const navStyle = {
        mx: { sm: 3 },
        mt: { sm: 4 },
        borderRadius: { sm: 1 },
        bgcolor: blue[700],
        color: "white",
        boxSizing: "border-box",
        py: .875,
        boxShadow: "0 1px 2px -1px rgba(0, 0, 0, .3)",
        top: 0,
        position: "sticky",
        zIndex: 100
    }
    return (
        <Box sx={ navStyle }>
            <Container>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 1, sm: 2 } }}>
                    <Typography color="inherit" component={ NavLink } to="/" variant="h6" sx={ logoStyle }>
                        Nigma
                    </Typography>
                    <UserAvatar />
                </Box>
            </Container>
        </Box>
    )
}

export default DashboardNav