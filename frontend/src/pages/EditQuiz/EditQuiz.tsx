import { Box, Button, Container, Grid, List, TextField } from "@mui/material"
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
    const [question, setQuestion] = useState<IQuestion|null>(null)
    const { quiz_id='' } = useParams()
    const { getQuiz, update, destroy } = useQuizzes()

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
        const response = await update(quiz, quiz_id)
        if (response?.status === "failure") setErrors(response.messages)
    }

    const handleDelete = async () => 
    {
        const response = await destroy(quiz_id)
        console.log(response)
    }

    useEffect( () => {
        if (quiz_id) {
            const quiz = getQuiz(quiz_id)
            setTitle(quiz?.title || '')
            setQuiz(quiz)
            setQuestions(quiz?.questions || [])
        }
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
                                    <ImageUpload placeholder={ quiz?.image } setImage={ handleImage } />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <InputTime />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button fullWidth variant="contained" onClick={ handleSave }>Save</Button>
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button fullWidth variant="contained" color="error" onClick={ handleDelete }>Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default EditQuiz