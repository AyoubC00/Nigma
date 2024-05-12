import { DashboardOutlined, HomeOutlined, PersonOutline, QuizOutlined } from "@mui/icons-material"
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { NavLink } from "react-router-dom"
import UserAvatar from "../UserAvatar/UserAvatar"

const Sidebar = () =>
{
    const sidebarLinks = [
        { name: "Home", link: "/", icon: <HomeOutlined /> },
        { name: "Dashboard", link: "", icon: <DashboardOutlined /> },
        { name: "Profile", link: "profile", icon: <PersonOutline />},
        { name: "Quizzes", link: "quizzes", icon: <QuizOutlined />},
    ]
    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            mr: 0,
            bgcolor: blue[700],
            color: "white",
            width: 256,
            boxShadow: 4,
            height: 1,
            zIndex: 10,
            display: { xs: "none", md: "block" }
        }}>
            <List>
                <ListSubheader sx={{ bgcolor: "transparent", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, px: { xs: 1, sm: 2 } }}>
                    <Typography color="inherit" component={ NavLink } to="/" variant="h6" sx={{ textDecoration: "none" }}>
                        Nigma
                    </Typography>
                    <UserAvatar />
                </ListSubheader>
                <Divider sx={{ mb: 1 }} />
                {
                    sidebarLinks.map((item, index) =>
                        <ListItemButton key={ index } component={ NavLink } to={ item.link }>
                            <ListItemIcon sx={{ color: "inherit" }}>{ item.icon }</ListItemIcon>
                            <ListItemText primary={ item.name }/>
                        </ListItemButton>
                    )
                }
            </List>
        </Box>
    )
}

export default Sidebar