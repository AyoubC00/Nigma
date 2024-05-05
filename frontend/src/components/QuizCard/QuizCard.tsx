import { Edit } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, SxProps, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { useQuizzes } from "../../contexts/QuizzesContext"

const QuizCard = ({ id, title, image, category="sth" }: QuizCard) =>
{
    const { setState } = useQuizzes()
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
                sx={{ position: "absolute", top: 0, right: 0, m: 1, zIndex: 1, letterSpacing: .8 }} />
            <Chip 
                label="Edit"
                variant="filled" 
                color="secondary" 
                size="small"
                icon={
                    <Edit />
                }
                onClick={ handleEdit }
                sx={{ position: "absolute", top: 28, right: 0, m: 1, zIndex: 1, letterSpacing: .8 }} />
            <CardContent sx={ cardContentStyle }>
                <Chip 
                    size="small" 
                    variant="filled"
                    color="primary"
                    avatar={ <Avatar>AC</Avatar> }
                    label="AyoubC00"
                    sx={{ width: "fit-content", color: "white"}}
                />
                <Box sx={{
                    height: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}>
                    <Typography>{ title }</Typography>
                    <Button fullWidth variant="outlined" color="inherit" component={ NavLink } to={ `/playground/quiz/${ id }` }>Take quiz</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default QuizCard