import { ChevronRight } from "@mui/icons-material"
import { Alert, Box, Button, Drawer, DrawerProps, IconButton, ListItem, ListItemIcon, ListItemText, Snackbar, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import OptionField from "../OptionField/OptionField"
import React, { useEffect, useState } from "react"

type Option = {
    id: number | string
    text: string
    is_correct: boolean
}

interface IQuestion {
    id?: number | string
    text: string
    options: Option[]
}

interface ICreateQuiz  {
    onClick?: (event: React.MouseEvent) => void
    onClose?: (event: React.MouseEvent) => void
    setQuestions?: (question: IQuestion) => void
    question?: IQuestion | null
}


const CreateQuestion = ({ question, onClick, onClose, setQuestions, ...props }: ICreateQuiz & DrawerProps) =>
{
    const [_question, setQuestion] = useState<string>('')
    const [feedback, setFeedback] = useState<string>()
    const [errors, setErrors] = useState<Errors>({})
    const [open, setOpen] = useState(false)
    const [submitable, setSubmitable] = useState(false)
    const [options, setOptions] = useState<Options>(
        {
            "option_1": { id: "", text: "", is_correct: false },
            "option_2": { id: "", text: "", is_correct: false },
            "option_3": { id: "", text: "", is_correct: false },
            "option_4": { id: "", text: "", is_correct: false }
        }
    )
    useEffect( () => {
        if (question)
        {
            setQuestion(question?.text)
            setOptions(question?.options.reduce((acc, curr, index) => ({ ...acc, [`option_${ index + 1}`]: { ...curr } }) ,{}))
        }
        else reset()
    }, [question])
    useEffect( () => {
        if(ready_to_submit()) setSubmitable(true)
        else setSubmitable(false)
    }, [_question, options])
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
    const reset = () => 
    {
        setQuestion('')
        setOptions({
            "option_1": { id: "1", text: "", is_correct: false },
            "option_2": { id: "2", text: "", is_correct: false },
            "option_3": { id: "3", text: "", is_correct: false },
            "option_4": { id: "4", text: "", is_correct: false }
        })
    }
    const ready_to_submit = () =>
    {
        let ready = true && !!_question.trim()
        let option_set = false
        for (let option in options) 
        {
            ready = ready && !!options[option].text.trim() 
            option_set = option_set || !!options[option].is_correct
        }
        return ready && option_set
    }
    const is_valid = () =>
    {
        const errors:Errors = {}
        let valid_options = false
        if (!_question.trim()) { errors.text = "Question text is required" }
        for (let option in options) 
        {
            if (!options[option].text.trim()) { errors[option] = "This field is required" }
            valid_options = valid_options || options[option].is_correct
        }
        if (!valid_options) { errors.message = "You must set a correct option" }
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const handleSubmit = () =>
    {
        if (!is_valid()) return
        const opts = Object.values(options)
        setQuestions?.({ text: _question, options: opts })
        setOpen(true)
        setFeedback("Question was added successfully.")
    }
    const handleUpdate = () =>
    {
        if(question)
        {
            if (!is_valid()) return
            const opts = Object.values(options)
            setQuestions?.({ id: question?.id, text: _question, options: opts })
            setOpen(true)
            setFeedback("Question was updated successfully.")
        }
    }
    const handleClose = (event: React.MouseEvent) =>
    {
        onClose?.(event)
        setErrors({})
        if(!question) reset()
    }
    return (
        <>
            <Drawer { ...props } onClose={ handleClose } anchor="right">
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
                        { errors.message ? <Alert severity="error" sx={{ mb: 3 }}> { errors.message } </Alert> : null }
                        <TextField 
                            fullWidth 
                            size="small" 
                            label="Question" 
                            sx={{ mb: 2 }} 
                            error={ errors["text"] ? true : false }
                            helperText={ errors["text"] }
                            name="question" 
                            value={ _question } 
                            onChange={ handleChange }
                        />
                        {
                            [1, 2, 3, 4].map((th, index) =>
                                <OptionField 
                                    key={ index }
                                    label={`Option ${ th }`} 
                                    name={`option_${ th }`} 
                                    error={ errors[`option_${ th }`] ? true : false }
                                    helperText={ errors[`option_${ th }`] }
                                    value={ options[`option_${ th }`]?.text } 
                                    checked={ options[`option_${ th }`]?.is_correct } 
                                    onChange={ handleChange } 
                                    onCheck={ handleCheck } 
                                    sx={{ mb: 1 }}
                                />
                            )
                        }
                    </Box>
                    {
                        question
                        ? <Button fullWidth variant="contained" onClick={ handleUpdate }>Update</Button>
                        : <Button fullWidth variant="contained" disabled={ !submitable } onClick={ handleSubmit }>Create</Button>

                    }
                </Box>
            </Drawer>
            <Snackbar
                open={ open } 
                onClose={ () => setOpen(false) }
                autoHideDuration={ 2000 }
                message="Hey"
            >
                <Alert severity="success" variant="standard">{ feedback }</Alert>
            </Snackbar>
        </>
    )
}

export default CreateQuestion