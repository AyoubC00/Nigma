import { AppRegistrationRounded, ChevronLeft, HomeRounded, InsertDriveFileOutlined, LoginRounded, MailOutlineRounded } from "@mui/icons-material"
import { Box, Divider, Drawer, DrawerProps, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const MobileNav = ( { onClick, ...props }: IMobileNav & DrawerProps ) =>
{
    const { token } = useAuth()
    const navbarItems = [
        [
            { icon: <HomeRounded />, text: "Home", link: "/"},
            { icon: <MailOutlineRounded />, text: "Contact", link: "contact"},
            { icon: <InsertDriveFileOutlined />, text: "Quizzes", link: "quizzes"},
        ],
        [
            { icon: <LoginRounded />, text: "Login", link: "login"},
            { icon: <AppRegistrationRounded />, text: "Register", link: "register"},
        ]
    ]
    return (
        <Drawer { ...props }>
            <Box sx={{ width: 250, bgcolor: blue[700], height: 1, color: "white" }}>
                <List>
                    <ListItem 
                        secondaryAction={
                            <IconButton onClick={ onClick } sx={{ color: "white" }}>
                                <ChevronLeft />
                            </IconButton>
                        }
                        sx={{ mb: 1 }}
                    >
                        <Typography color="inherit" variant="h6">
                            Nigma
                        </Typography>
                    </ListItem>
                    <Divider />
                    {
                        navbarItems.map((partition, i) =>
                            partition.map((item, j) =>
                                i === 1 && token ? null :
                                <ListItem 
                                    key={ j } 
                                    disablePadding 
                                    component={ NavLink } 
                                    to={ item.link } 
                                    onClick={ onClick }
                                >
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: "white" }}>{ item.icon }</ListItemIcon>
                                        <ListItemText sx={{ color: "white" }} primary={ item.text }/>
                                    </ListItemButton>
                                </ListItem>
                            )
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}
export default MobileNav