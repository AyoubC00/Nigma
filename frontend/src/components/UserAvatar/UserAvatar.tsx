import { DashboardOutlined, HomeOutlined, LogoutOutlined, PersonOutline, QuizOutlined } from "@mui/icons-material"
import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { blue } from "@mui/material/colors"
import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const UserAvatar = () =>
{
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const { logout } = useAuth()
    const open = Boolean(anchorEl)
    const handleAnchor = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () =>
    {
        setAnchorEl(null)
    }
    const handleAction = (action: MenuAction) =>
    {
        setAnchorEl(null)
        action?.()
    }
    const menuItems = [
        { name: "Home", icon: <HomeOutlined />, link: "/" },
        { name: "Dashboard", icon: <DashboardOutlined />, link: "/dashboard" },
        { name: "Profile", icon: <PersonOutline />, link: "/dashboard/profile" },
        { name: "Quizzes", icon: <QuizOutlined />, link: "/dashboard/quizzes" },
        { name: "Logout", icon: <LogoutOutlined />, action: logout },
    ]
    return (
        <Box>
            <IconButton size="small" onClick={ handleAnchor }>
                <Avatar sx={{ bgcolor: blue[500] }}>AC</Avatar>
            </IconButton>
            <Menu anchorEl={ anchorEl } open={ open } onClose={ handleClose }>
                {
                    menuItems.map((item, index) =>
                        item?.link !== undefined
                        ? (
                            <MenuItem key={ index } onClick={ handleClose } component={ NavLink } to={ item.link }>
                                <ListItemIcon sx={{ color: "inherit" }}>{ item.icon }</ListItemIcon>
                                <ListItemText primary={ item.name }/>
                            </MenuItem>
                        )
                        :(
                            <MenuItem key={ index } onClick={ () => handleAction(item.action) }>
                                <ListItemIcon sx={{ color: "inherit" }}>{ item.icon }</ListItemIcon>
                                <ListItemText primary={ item.name }/>
                            </MenuItem>
                        )
                    )
                }
            </Menu>
        </Box>
    )
}

export default UserAvatar