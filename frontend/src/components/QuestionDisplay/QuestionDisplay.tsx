import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import DropMenu from "../DropMenu/DropMenu"
import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material"
import { useState } from "react"

interface IQuestionDisplayProps {
    onEdit?: () => void
}

const QuestionDisplay = ({ onEdit }: IQuestionDisplayProps) =>
{
    const [open, setOpen] = useState<boolean>(false)
    const menuList = [
        { name: "Edit", action: () => onEdit?.() },
        { name: "Delete", action: () => {} }
    ]
    return (
        <Paper sx={{ mb: 2 }}>
            <ListItem 
                sx={{ ".MuiListItemSecondaryAction-root": { height: 1, mt: 1 } }} 
                secondaryAction={
                <DropMenu menuList={ menuList } icon={ <MoreVert /> } />
            }>
                <ListItemText 
                    primary="Question 1" 
                    secondary="What would you do if you have something to do but don't know what it is and you wonder what it could be" 
                />
            </ListItem>
            <Collapse in={ open } unmountOnExit>
                <ListItem disableGutters disablePadding dense>
                    <ListItemText
                        primary={
                            <List dense disablePadding>
                                <ListItem >
                                    <ListItemText primary="First option" secondary="Correct"/>
                                </ListItem>                                
                                <ListItem >
                                    <ListItemText primary="Second option" secondary="Wrong"/>
                                </ListItem>                                    
                                <ListItem >
                                    <ListItemText primary="Third option" secondary="Wrong"/>
                                </ListItem>                                    
                                <ListItem >
                                    <ListItemText primary="Fourth option" secondary="Wrong"/>
                                </ListItem>                                    
                            </List>
                        }
                    />
                </ListItem>
            </Collapse>
            <ListItemButton onClick={ () => setOpen(prev => !prev) } dense sx={{ py: 1 }}>
                {
                    open 
                    ? <><ListItemText primary="Collapse"/><ExpandLess /></>
                    : <><ListItemText primary="Expand" /><ExpandMore /></>
                } 
            </ListItemButton>
        </Paper>
    )
}

export default QuestionDisplay