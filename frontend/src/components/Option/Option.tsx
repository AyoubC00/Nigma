import { CheckRounded, Close, Help } from "@mui/icons-material"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { blue, green, orange, red } from "@mui/material/colors"
import { useState } from "react"

type Option = {
    id: number | string
    bgcolor?: string
    value?: string
    is_correct?: boolean | null
    handleAnswer?: (option_id: number | string) => void
}
interface IColor {
    [color: string]: {
        primary: string
        secondary: string
    }
}

const COLORS: IColor = {
    "blue": { primary: blue[700], secondary: blue[600] },
    "red": { primary: red[700], secondary: red[600] },
    "green": { primary: green[700], secondary: green[600] },
    "orange": { primary: orange[700], secondary: orange[600] },
}

const Option = ({ id, value, handleAnswer, bgcolor="blue", is_correct=null }: Option) =>
{
    const [selected, setSelected] = useState(false)
    
    const containerStyle = {
        bgcolor: COLORS[bgcolor].primary, 
        boxShadow: 1, 
        borderRadius: 1, 
        "&:focus": { bgcolor: COLORS[bgcolor].secondary },
        "&:hover": { bgcolor: COLORS[bgcolor].secondary }
    }
    const disabled = !(is_correct ?? true)

    const handleClick = () =>
    {
        setSelected(true)
        handleAnswer?.(id)
    }

    return (
        <ListItemButton sx={ containerStyle } disabled={ disabled } onClick={ handleClick }>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}>
                { is_correct === null ? <Help /> : is_correct ? <CheckRounded /> : <Close /> }
            </ListItemIcon>
            <ListItemText primary={ value }/>
        </ListItemButton>            
    )
}

export default Option