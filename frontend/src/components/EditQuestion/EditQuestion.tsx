import { ChevronRight } from "@mui/icons-material"
import { Box, Drawer, DrawerProps, IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import OptionField from "../OptionField/OptionField"

interface IEditQuestion  {
    onClick?: (event: React.MouseEvent) => void
    setQuestions?: (question: IQuestion) => void
}

const EditQuestion = ({ onClick, ...props }: IEditQuestion & DrawerProps) =>
{
    return (
        <Drawer { ...props } anchor="right">
            <ListItem sx={{ bgcolor: blue[700], color: "white" }}>
                <ListItemIcon>
                    <IconButton sx={{ color: "white" }}  onClick={ onClick }>
                        <ChevronRight />
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary="Edit question"/>
            </ListItem>
            <Box sx={{ width: { sm: 500 }, py: 3, px: 4, height: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    <TextField fullWidth size="small" label="Question" sx={{ mb: 2 }} name="question"/>
                    {
                        [1,2,3,4].map((opt, index) =>
                            <OptionField 
                                key={ index }
                                label={`Option ${ opt }`} 
                                name={`option_${ opt }`} 
                                // value={ options[`option_${ opt }`].text } 
                                // checked={ options[`option_${ opt }`].is_correct } 
                                // onChange={ handleChange } 
                                // onCheck={ handleCheck } 
                                sx={{ mb: 1 }}
                            />
                        )
                    }
                </Box>
            </Box>
        </Drawer>
    )
}

export default EditQuestion