import { Alert, Box, Button, Container, Grid, List, Snackbar, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion"
import QuestionElement from "../../components/QuestionElement/QuestionElement"
import ImageUpload from "../../components/ImageUpdaload/ImageUpload"
import { SaveOutlined } from "@mui/icons-material"
import { useQuizzes } from "../../contexts/QuizzesContext"
import InputTime from "../../components/InputTime/InputTime"
import QuestionDisplay from "../../components/QuestionDisplay/QuestionDisplay"

// type Option = {
//     text: string
//     is_correct: boolean
// }

interface IQuestion {
    id?: number | string
    text: string
    options: IOption[]
}

const CreateQuiz = () =>
{
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [success, setSuccess] = useState<string>('')
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [_question, setQuestion] = useState<IQuestion|null>(null)
    const [image, setImage] = useState<Blob | string>('')
    const [errors, setErrors] = useState<Partial<IQuiz>>({})
    const [id, setId] = useState(0)
    const { save } = useQuizzes()

    useEffect( () => {
        if (!open) setQuestion(null)
    }, [open])

    const reset = () => {
        setTitle('')
        setQuestions([])
        setImage('')
        setErrors({})
    }
    const handleImage = (image: File) => setImage(image)
    const handleTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
    const handleQuestions = (question: IQuestion) => {
        setQuestions(prev => 
            prev.length > 0 && question?.id !== undefined
            ? prev.map(qst => qst.id == question.id ? question : qst)
            : [...prev, { id, ...question }])
        if (question?.id === undefined) setId(prev => prev + 1)
    }
    console.log(id)
    const handleSave = async () =>
    {
        const quiz = new FormData()
        quiz.append("title", title)
        quiz.append("image", image)
        questions.forEach((question, index) => {
            quiz.append(`questions[${index}][text]`, question.text)
            question.options.forEach((option, j) => {
                quiz.append(`questions[${index}][options][${j}][text]`, option["text"])
                quiz.append(`questions[${index}][options][${j}][is_correct]`, `${Number(option["is_correct"])}`)
            })
        })
        const response = await save(quiz)
        if (response?.status === "failure") setErrors(response.messages)
        else 
        {
            setSuccess("The quiz was created successfully.")
            reset()
        }
    }
    const handleEdit = (question: IQuestion) =>
    {
        if (question) setQuestion(question)
        setOpen(true)
    }
    return (
        <Container>
            <CreateQuestion open={ open } question={ _question } onClose={ () => setOpen(false) } onClick={ () => setOpen(false) } setQuestions={ handleQuestions } />
            <Box sx={{ py: 4 }}>
                <Box sx={{ display: { xs: "block", sm: "flex" }, gap: 4, mb: 4 }}>
                    <Box sx={{ mb: { xs: 2, sm: 0 }, width: 1, display: "none" }}>
                        {/* <TextField fullWidth size="small" label="Quiz title" value={ title } onChange={ handleTitle } sx={{ mb: 2 }} error={ errors.title ? true : false } helperText={ errors.title } /> */}
                        {/* <Button fullWidth size="medium" variant="outlined" sx={{ mb: 2 }} onClick={ () => setOpen(true) } >Add question</Button>     */}
                        {/* { errors.questions ? <Alert severity="error">{ errors["questions"] }</Alert> : null } */}
                        {
                            questions.map((question, index) =>
                                <QuestionElement 
                                    key={ index }
                                    text={ question.text }
                                    options={ question.options }
                                />
                            )
                        }
                    </Box>
                    <Grid container spacing={ 4 }>
                        <Grid item xs={ 8 }>
                            <TextField fullWidth size="small" name="title" label="Title" value={ title } onChange={ handleTitle } sx={{ mb: 2 }} />
                            <Button fullWidth size="medium" variant="outlined" sx={{ mb: 2 }} onClick={ () => setOpen(true) } >Add question</Button>    
                            <List disablePadding>
                                {
                                    questions.map(question => 
                                        <QuestionDisplay 
                                            key={ question.id } 
                                            question={ question }
                                            onEdit={ handleEdit }
                                        />
                                    )
                                }
                            </List>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <Grid container spacing={ 2 }>
                                <Grid item xs={ 12 }>
                                    <ImageUpload error={ errors.image ? true : false } helperText={ errors.image } setImage={ handleImage } />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <InputTime />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    {/* <Button fullWidth variant="contained" onClick={ handleSave }>Save</Button> */}
                                    <Button fullWidth startIcon={ <SaveOutlined /> } variant="contained" size="medium" onClick={ handleSave} >Save</Button>               
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                
            </Box>
            <Snackbar 
                open={ Boolean(success) }
                autoHideDuration={ 2000 }
                onClose={ () => setSuccess('') }
            >
                <Alert>
                    { success }
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default CreateQuiz