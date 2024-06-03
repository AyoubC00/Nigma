import { Alert, Box, Button, Container, Grid, List, Skeleton, Snackbar, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import ImageUpload from "../../components/ImageUpdaload/ImageUpload"
import InputTime from "../../components/InputTime/InputTime"
import QuestionDisplay from "../../components/QuestionDisplay/QuestionDisplay"
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion"
import { useParams } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"

const EditQuiz = () =>
{
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [quiz, setQuiz] = useState<IQuiz|null>(null)
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [image, setImage] = useState<Blob | string>('')
    const [errors, setErrors] = useState<Partial<IQuiz>>({})
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState<string>('')
    const [question, setQuestion] = useState<IQuestion|null>(null)
    const { quiz_id='' } = useParams()
    const { get, update, destroy } = useQuizzes()

    const handleQuestions = (question: IQuestion) => {
        setQuestions(prev => {
            let questions = prev.map(qstn => qstn.id == question.id ? question : qstn )
            return questions
        })
    }
    
    const handleSave = async () =>
    {
        const quiz = new FormData()
        quiz.append("_method", "PUT")
        quiz.append("title", title)
        quiz.append("image", image)
        questions.forEach((question, index) => {
            quiz.append(`questions[${index}][id]`, question.id as string)
            quiz.append(`questions[${index}][text]`, question.text)
            question.options.forEach((option, j) => {
                quiz.append(`questions[${index}][options][${j}][id]`, option.id as string)
                quiz.append(`questions[${index}][options][${j}][text]`, option.text)
                quiz.append(`questions[${index}][options][${j}][is_correct]`, `${Number(option["is_correct"])}`)
            })
        })
        setProcessing(true)
        const response = await update(quiz, quiz_id)
        setProcessing(false)
        if (response?.status === "failure") setErrors(response.messages)
        else setSuccess("This quiz was updated successfully.")
    }
    console.log(errors)
    const handleDelete = async () => 
    {
        const response = await destroy(quiz_id)
        console.log(response)
    }

    useEffect( () => {
        ( async () => {
            if (quiz_id) {
                const response = await get(quiz_id)
                if (response?.status === "success")
                {
                    const { data: quiz } = response
                    setTitle(quiz?.title || '')
                    setQuiz(quiz)
                    setQuestions(quiz?.questions || [])
                }
            }
        })()
    }, [quiz_id])

    const handleImage = (image: File) =>
    {
        setImage(image)
    }

    const handleEdit = (question: IQuestion) =>
    {
        if (question) setQuestion(question)
        setOpen(true)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setTitle(event.target.value)
    }

        return (
        <Container>
            <CreateQuestion open={ open } question={ question } onClose={ () => setOpen(false) } onClick={ () => setOpen(false) } setQuestions={ handleQuestions } />
            <Box sx={{ px: { xs: 1, sm: 2 }, py: 4 }}>
                <Box>
                    <Grid container spacing={ 4 }>
                        <Grid item xs={ 8 }>
                            <TextField fullWidth size="small" name="title" label="Title" value={ title } onChange={ handleChange } sx={{ mb: 2 }} />
                            <List disablePadding>
                                {
                                    questions.length <= 0
                                    ? [1].map(question =>
                                        <Skeleton key={ question } sx={{ mb: 2 }} variant="rounded" animation="wave" height={ 118 } />
                                    )
                                    : questions.map(question => 
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
                                    <ImageUpload placeholder={ quiz?.image } setImage={ handleImage } />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <InputTime />
                                </Grid>
                                {/* <Grid item xs={ 12 }>
                                    <Button fullWidth size="medium" variant="outlined" onClick={ () => setOpen(true) } >Add question</Button>    
                                </Grid> */}
                                <Grid item xs={ 12 }>
                                    <Button fullWidth variant="contained" disabled={ processing }  onClick={ handleSave }>Save</Button>
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button fullWidth variant="contained" color="error" onClick={ handleDelete }>Delete</Button>
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

export default EditQuiz