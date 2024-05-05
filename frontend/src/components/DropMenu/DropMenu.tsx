import { SettingsRounded } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"

type Action = () => void

type MenuItem = {
    name: string
    action: Action
}

interface IDropMenu {
    menuList: MenuItem[]
}

const DropMenu = ( { menuList }: IDropMenu ) =>
{
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null)
    const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () =>
    {
        setAnchorEl(null)
    }
    const handleAction = (action: Action) =>
    {
            
        setAnchorEl(null)
        action?.()
    }
    return (
        <>
            <IconButton onClick={ handleOpen } sx={{ color: "inherit" }}>
                <SettingsRounded />
            </IconButton>
            <Menu anchorEl={ anchorEl } open={ Boolean(anchorEl) } onClose={ handleClose }>
                {
                    menuList.map((item, index) =>
                        <MenuItem key={ index } onClick={ () => handleAction(item.action) }>{ item.name }</MenuItem>
                    )
                }
            </Menu>
        </>
    )
}

export default DropMenu