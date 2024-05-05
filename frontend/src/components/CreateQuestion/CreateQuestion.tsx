import { ChevronRight } from "@mui/icons-material"
import { Box, Button, Drawer, DrawerProps, IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import OptionField from "../OptionField/OptionField"
import React, { useState } from "react"

type Option = {
    text: string
    is_correct: boolean
}

interface IQuestion {
    text: string
    options: Option[]
}

interface ICreateQuiz  {
    onClick?: (event: React.MouseEvent) => void
    setQuestions?: (question: IQuestion) => void
}

const CreateQuestion = ({ onClick, setQuestions, ...props }: ICreateQuiz & DrawerProps) =>
{
    const [question, setQuestion] = useState<string>('')
    const [options, setOptions] = useState<Options>({
        "option_1": { text: "", is_correct: false },
        "option_2": { text: "", is_correct: false },
        "option_3": { text: "", is_correct: false },
        "option_4": { text: "", is_correct: false }
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = event.target
        if ( name === "question") return setQuestion(value)
        setOptions(prev => ({ ...prev, [name]: { ...prev[name], text: value } }))
    }
    const handleCheck = (target: string = '') =>
    {
        setOptions(prev => ({ ...prev, [target]: { ...prev[target], is_correct: !prev[target].is_correct } }))
    }
    const handleSubmit = () =>
    {
        const opts = Object.values(options)
        setQuestions?.({ text: question, options: opts })
    }
    return (
        <Drawer { ...props } anchor="right">
            <ListItem sx={{ bgcolor: blue[700], color: "white" }}>
                <ListItemIcon>
                    <IconButton sx={{ color: "white" }}  onClick={ onClick }>
                        <ChevronRight />
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary="Create a question"/>
            </ListItem>
            <Box sx={{ width: { sm: 500 }, py: 3, px: 4, height: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    <TextField fullWidth size="small" label="Question" sx={{ mb: 2 }} name="question" value={ question } onChange={ handleChange }/>
                    {
                        [1,2,3,4].map((opt, index) =>
                            <OptionField 
                                key={ index }
                                label={`Option ${ opt }`} 
                                name={`option_${ opt }`} 
                                value={ options[`option_${ opt }`].text } 
                                checked={ options[`option_${ opt }`].is_correct } 
                                onChange={ handleChange } 
                                onCheck={ handleCheck } 
                                sx={{ mb: 1 }}
                            />
                        )
                    }
                </Box>
                <Button fullWidth variant="contained" onClick={ handleSubmit }>Create</Button>
            </Box>
        </Drawer>
    )
}

export default CreateQuestion