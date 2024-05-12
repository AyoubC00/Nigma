import { Box, Container, Grid, List, ListItem, ListItemText, Paper, TextField } from "@mui/material"
import { useState } from "react"
import ImageUpload from "../../components/ImageUpdaload/ImageUpload"
import InputTime from "../../components/InputTime/InputTime"
import DropMenu from "../../components/DropMenu/DropMenu"
import { MoreVert } from "@mui/icons-material"
import QuestionElement from "../../components/QuestionElement/QuestionElement"
import QuestionDisplay from "../../components/QuestionDisplay/QuestionDisplay"
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion"
import EditQuestion from "../../components/EditQuestion/EditQuestion"

const EditQuiz = () =>
{
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [image, setImage] = useState<Blob | string>('')
    const [errors, setErrors] = useState<Partial<IQuiz>>({})

    const handleImage = (image: File) =>
    {
        setImage(image)
    }

    const handleEdit = () =>
    {
        setOpen(true)
    }

    return (
        <Container>
            <EditQuestion open={ open } onClose={ () => setOpen(false) } onClick={ () => setOpen(false) }/>
            <Box sx={{ px: { xs: 1, sm: 2 }, py: 4 }}>
                <Box>
                    <Grid container spacing={ 4 }>
                        <Grid item xs={ 8 }>
                            <TextField fullWidth size="small" label="Title" sx={{ mb: 2 }} />
                            <List disablePadding>
                                <QuestionDisplay onEdit={ handleEdit }/>
                                <QuestionDisplay />
                                <QuestionDisplay />
                                <QuestionDisplay />
                            </List>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <Grid container spacing={ 2 }>
                                <Grid item xs={ 12 }>
                                    <ImageUpload setImage={ handleImage } />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <InputTime />
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