import { Help } from "@mui/icons-material"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { blue, green, orange, red } from "@mui/material/colors"

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
const Option = ({ id, value, handleAnswer, bgcolor="blue", is_correct=null }: Option) =>
{

    const COLORS: IColor = {
        "blue": { primary: blue[700], secondary: blue[600] },
        "red": { primary: red[700], secondary: red[600] },
        "green": { primary: green[700], secondary: green[600] },
        "orange": { primary: orange[700], secondary: orange[600] },
    }
    const containerStyle = {
        bgcolor: COLORS[bgcolor].primary, 
        boxShadow: 1, 
        borderRadius: 1, 
        "&:focus": { bgcolor: COLORS[bgcolor].secondary },
        "&:hover": { bgcolor: COLORS[bgcolor].secondary }
    }
    const disabled = !(is_correct ?? true)
    return (
        <ListItemButton sx={ containerStyle } disabled={ disabled } onClick={ () => handleAnswer?.(id) }>
            <ListItemIcon sx={{ color: "white", minWidth: 35 }}><Help /></ListItemIcon>
            <ListItemText primary={ value }/>
        </ListItemButton>            
    )
}

export default Option