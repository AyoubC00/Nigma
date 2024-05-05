import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, ButtonProps, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { NavLink } from "react-router-dom"
import MobileNav from "../MobileNav/MobileNav";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () =>
{
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const { token } = useAuth()
    const handleClose = () =>
    {
        setOpenMenu(false)
    }
    const handleOpen = () =>
    {
        setOpenMenu(true)
    }
    const navLinks:(NavLink & ButtonProps)[][] = [
        [
            { variant: "text", color: "inherit", name: "home", to: "/" },
            { variant: "text", color: "inherit", name: "contact", to: "/contact" },
        ],
        [
            { variant: "text", color: "inherit", name: "login", to: "/login", sx: { mr: 2} },
            { variant: "contained", color: "secondary", name: "register", to: "/register" },
        ]
    ]
    const logoStyle = {
        textDecoration: "none",
        mr: 4
    }
    const navLinksStyle = {
        display: { xs: "none", md: "flex" },
        width: 1,
        justifyContent: "space-between",
    }
    return (
        <>
            <MobileNav open={ openMenu } onClose={ handleClose } onClick={ handleClose }/>
            <AppBar>
                <Container>
                    <Toolbar>
                        <Box sx={{ mr: "auto", display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton edge="start" sx={{ color: "white", display: { xs: "flex", md: "none" } }} onClick={ handleOpen }>
                                <Menu />
                            </IconButton>
                            <Typography color="inherit" component={ NavLink } to="/" variant="h6" sx={ logoStyle }>
                                Nigma
                            </Typography>
                        </Box>
                        <Box sx={ navLinksStyle }>
                            {
                                navLinks.map( (partition, i) =>
                                    <Box key={ i }>
                                        {
                                            partition.map( (link, j) =>
                                                i === 1 && token ? null :
                                                <Button 
                                                    key={ j } 
                                                    variant={ link.variant } 
                                                    color={ link.color } 
                                                    component={ NavLink } 
                                                    to={ link.to }
                                                    sx={ link?.sx }
                                                >
                                                    { link.name }
                                                </Button>
                                            )
                                        }
                                    </Box>
                                )
                            }
                        </Box>
                        { token !== null ? <UserAvatar /> : null }
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar