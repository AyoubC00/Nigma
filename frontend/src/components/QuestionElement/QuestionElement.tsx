import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material"
import { Checkbox, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { grey } from "@mui/material/colors"
import OptionElement from "../OptionElement/OptionElement";

type Option = {
    id?: number | string
    text: string
    is_correct: boolean
}

interface IQuestionElement {
    id?: number | string
    text: string
    options: Option[]
    selectable?: boolean
    editable?: boolean
}

const QuestionElement = ({ text, options, selectable, editable }: IQuestionElement) =>
{
    const [open, setOpen] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const openMenu = Boolean(anchorEl)
    const handleOpen = () =>
    {
        setOpen(prev => !prev)
    }
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        event.stopPropagation()
        setChecked(prev => !prev)
    }
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () =>
    {
        setAnchorEl(null)
    }
    const secondaryAction = (
        editable
        ? <>
            <IconButton 
                edge="end"
                onClick={ handleMenuOpen }
            >
                <MoreVert />
            </IconButton>
            <Menu 
                open={ openMenu }
                onClose={ handleMenuClose }
                anchorEl={ anchorEl }
            >
                <MenuItem dense>
                    <ListItemText primary="Edit" />
                </MenuItem>
            </Menu>
        </>
        : null
    )
    return (
        <List disablePadding sx={{ boxShadow: `0 0 1px 0 ${ grey[500] }`, borderRadius: .5, mb: 1 }} >
            <ListItem 
                disablePadding 
                secondaryAction={ secondaryAction }
            >
                <ListItemButton 
                    onClick={ handleOpen }
                >
                    {
                        selectable
                        ? (
                            <ListItemIcon>
                                <Checkbox size="small"onChange={ handleChecked } checked={ checked } />
                            </ListItemIcon>
                        )
                        : null
                    }
                    <ListItemText primary={ text } />
                    { open ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
            </ListItem>
            <Collapse in={ open } unmountOnExit>
                <List sx={{ pl: 4 }}>
                    {
                        options.map((option, index) => 
                            <OptionElement 
                                key={ option.id || index } 
                                text={ option.text } 
                                correct={ option.is_correct } 
                            />
                        )
                    }
                </List>
            </Collapse>
        </List>
    )
}

export default QuestionElement