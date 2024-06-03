import { Edit } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, SxProps, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"
import { useAuth } from "../../contexts/AuthContext"

const QuizCard = ({ id, owner, title, image, taken, category="Category" }: QuizCard) =>
{
    const { setState, saveAttempt, resetScore } = useQuizzes()
    const { user } = useAuth()
    const navigate = useNavigate()
    const cardStyle: SxProps = [
        {
            "&:hover>.MuiCardContent-root": {
                display: "block",
                height: 1,
            },
            "&:hover > .MuiCardMedia-root": {
                backgroundSize: "120%"
            }
        },
        { 
            height: 200, 
            position: "relative",
        }
    ]
    const cardContentStyle: SxProps = {
        position: "absolute", 
        top: "50%",
        translate: "0 -50%", 
        left: 0, 
        boxSizing: "border-box",
        width: 1,
        height: 0,
        display: "none",
        overflow: "hidden",
        bgcolor: "rgba(21, 101, 192, .7)",
        backdropFilter: "blur(5px)",
        color: "white",
        pt: 1,
    }
    const handleEdit = () =>
    {
        setState("edit")
        navigate(`/dashboard/quizzes/${ id }/edit`)
    }
    const handleClick = async () =>
    {
        if (taken) {
            const response = await resetScore(id)
            if (response?.status === "success") navigate(`/playground/quiz/${ id }`)
        }
        else
        {
            const response = await saveAttempt(id)
            if (response?.status === "success") navigate(`/playground/quiz/${ id }`)
        }
        
    }
    return (
        <Card sx={ cardStyle }>
            <CardMedia 
                image={ image } 
                sx={{ height: 1, backgroundSize: "100%", transition: ".1s" }} 
            />
            <Chip 
                label={ category } 
                variant="filled" 
                color="primary" 
                size="small"
                sx={{ position: "absolute", top: 0, right: 0, m: 1, zIndex: 1, letterSpacing: .8 }} 
            />
            {
                owner.id == user?.id &&
                <Chip 
                    label="Edit"
                    variant="filled" 
                    color="secondary" 
                    size="small"
                    icon={
                        <Edit />
                    }
                    onClick={ handleEdit }
                    sx={{ position: "absolute", top: 28, right: 0, m: 1, zIndex: 1, letterSpacing: .8 }} 
                />
            }
            <CardContent sx={ cardContentStyle }>
                <Chip 
                    size="small" 
                    variant="filled"
                    color="primary"
                    avatar={ <Avatar>{ `${ owner?.first_name[0] }${ owner?.last_name[0] }` }</Avatar> }
                    label={ owner?.username }
                    sx={{ width: "fit-content", color: "white"}}
                />
                <Box sx={{
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}>
                    <Typography>{ title }</Typography>
                    <Button fullWidth variant="outlined" color="inherit" onClick={ handleClick } >
                        { taken ? "Try againe" : "Take quiz" }
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default QuizCard