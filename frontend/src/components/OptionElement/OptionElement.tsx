import { MoreVert } from "@mui/icons-material"
import { IconButton, ListItem, ListItemText, Menu, MenuItem } from "@mui/material"
import { useState } from "react"

interface IOption {
    text: string
    correct: boolean
}

const OptionElement = ({ text, correct }: IOption) =>
{
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () =>
    {
        setAnchorEl(null)
    }
    const actions = ["Edit", "Delete"]
    return (
        <ListItem 
            secondaryAction={
                <>
                    <IconButton edge="end" onClick={ handleClick } >
                        <MoreVert />
                    </IconButton>
                    <Menu open={ open }onClose={ handleClose }anchorEl={ anchorEl }
                    >
                        {
                            actions.map((action, index) =>
                                <MenuItem dense key={ index }>
                                    <ListItemText primary={ action } />
                                </MenuItem>
                            )
                        }
                    </Menu>
                </>
            }
        >
            <ListItemText primary={ text } secondary={ correct ? "Correct" : "Wrong" } />
        </ListItem>
    )
}

export default OptionElement