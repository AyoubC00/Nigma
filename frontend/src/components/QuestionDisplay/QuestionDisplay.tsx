import { Collapse, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import DropMenu from "../DropMenu/DropMenu"
import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material"
import { useState } from "react"

interface IQuestionDisplayProps {
    onEdit?: (question: IQuestion) => void
    question: IQuestion
}

const QuestionDisplay = ({ question, onEdit }: IQuestionDisplayProps) =>
{
    const [open, setOpen] = useState<boolean>(false)
    const menuList = [
        { name: "Edit", action: () => onEdit?.(question) },
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
                    secondary={ question?.text } 
                />
            </ListItem>
            <Collapse in={ open } unmountOnExit>
                <ListItem disableGutters disablePadding dense>
                    <ListItemText
                        primary={
                            <List dense disablePadding>
                                {
                                    question?.options?.map(option =>
                                        <ListItem key={ option.id }>
                                            <ListItemText 
                                                primary={ option.text } 
                                                secondary={ option.is_correct ? "Correct" : "Wrong" }
                                            />
                                        </ListItem>                                
                                    )
                                }
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