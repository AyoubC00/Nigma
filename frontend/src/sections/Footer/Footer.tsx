import { GitHub, LinkedIn } from "@mui/icons-material"
import { Box, Button, Container, IconButton, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const Footer = () =>
{
    const { token } = useAuth()
    const navLinks = [
        { name: "home", to: "/" },
        { name: "contact", to: "/contact" },
        { name: "login", to: "/login", sx: { mr: 2} },
        { name: "register", to: "/register" },
    ]
    const followStyle = {
        display: "flex", 
        alignItems: "center", 
        mb: 1, 
        justifyContent: { xs: "center", sm: "start" }
    }
    const containerStyle = { 
        display: "flex", 
        alignItems: "center", 
        flexWrap: "wrap", 
        justifyContent: {xs: "center", sm: "space-between" } 
    }
    return (
        <Box sx={{ bgcolor: blue[700], color: "white", mt: "auto" }}>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3}, py: { xs: 4 } }}>
                    <Box sx={ followStyle }>
                        <Typography sx={{ mr: 2 }}>Follow us on</Typography>
                        <IconButton sx={{ color: "white" }}><LinkedIn /></IconButton>
                        <IconButton sx={{ color: "white" }}><GitHub /></IconButton>
                    </Box>
                    <Box sx={ containerStyle }>
                        <Typography variant="body2" sx={{ order: { xs: 2, sm: 1 } }}>
                            Copyright &copy; 2024 - Nigma, All rights reserved
                        </Typography>
                        <Box sx={{ order: { xs: 1, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
                            {
                                navLinks.map((link, index) =>
                                    (link.name === "login" || link.name === "register") 
                                    ? token ? null : (
                                        <Button 
                                            key={ index }
                                            variant="text" 
                                            color="inherit" 
                                            component={ NavLink } 
                                            to={ link.to }
                                        >{ link.name }</Button>
                                    )
                                    : 
                                    (
                                        <Button 
                                            key={ index }
                                            variant="text" 
                                            color="inherit" 
                                            component={ NavLink } 
                                            to={ link.to }
                                        >{ link.name }</Button>
                                    )
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer