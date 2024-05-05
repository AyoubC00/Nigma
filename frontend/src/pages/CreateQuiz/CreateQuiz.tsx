import { Box, Button, Container, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion"
import QuestionElement from "../../components/QuestionElement/QuestionElement"
import ImageUpload from "../../components/ImageUpdaload/ImageUpload"
import { SaveOutlined } from "@mui/icons-material"
import { useQuizzes } from "../../contexts/QuizzesContext"

type Option = {
    text: string
    is_correct: boolean
}

interface IQuestion {
    text: string
    options: Option[]
}

const CreateQuiz = () =>
{
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [image, setImage] = useState<Blob | string>('')
    const [errors, setErrors] = useState<Partial<IQuiz>>({})
    const { save } = useQuizzes()

    const handleImage = (image: File) => setImage(image)
    const handleTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
    const handleQuestions = (question: IQuestion) => setQuestions(prev => [ ...prev, question ])
    const handleSave = async () =>
    {
        const quiz = new FormData()
        quiz.append("title", title)
        quiz.append("image", image)
        questions.forEach((question, index) => quiz.append(`questions[${index}][text]`, question.text))
        questions.forEach((question, index) => {
            quiz.append(`questions[${index}][text]`, question.text)
            question.options.forEach((option, j) => {
                quiz.append(`questions[${index}][options][${j}][text]`, option["text"])
                quiz.append(`questions[${index}][options][${j}][is_correct]`, `${Number(option["is_correct"])}`)
            })
        })
        const response = await save(quiz)
        if (response?.status === "failure") setErrors(response.messages)
    }
    return (
        <Container>
            <CreateQuestion open={ open } onClose={ () => setOpen(false) } onClick={ () => setOpen(false) } setQuestions={ handleQuestions } />
            <Box sx={{ py: 4 }}>
                <Box sx={{ display: { xs: "block", sm: "flex" }, gap: 4, mb: 4 }}>
                    <Box sx={{ mb: { xs: 2, sm: 0 }, width: 1 }}>
                        <TextField fullWidth size="small" label="Quiz title" value={ title } onChange={ handleTitle } sx={{ mb: 2 }} error={ errors.title ? true : false } helperText={ errors.title } />
                        <Button fullWidth size="medium" variant="outlined" onClick={ () => setOpen(true) } >Add question</Button>    
                    </Box>
                    <Box>
                        <Button fullWidth startIcon={ <SaveOutlined /> } variant="contained" size="medium" sx={{ mb: 2 }} onClick={ handleSave} >Save</Button>               
                        <ImageUpload setImage={ handleImage } />               
                    </Box>
                </Box>
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
        </Container>
    )
}

export default CreateQuiz