import { Replay } from "@mui/icons-material"
import { Grid, IconButton, ListItem, ListItemText } from "@mui/material"
import { useQuizzes } from "../../contexts/QuizzesContext"
import { useNavigate } from "react-router-dom"

const Attempt = ({ id, quiz_id, title, score, since, mode }: IAttempt) =>
{
    const { resetScore } = useQuizzes()
    const navigate = useNavigate()
    const handleRetry = async () =>
    {
        const response = await resetScore(id)
        if (response?.status === "success") navigate(`/playground/quiz/${ quiz_id }`)
    }
    return (
        <ListItem secondaryAction={ <IconButton edge="end" onClick={ handleRetry }><Replay /></IconButton> }>
            <Grid container>
                <Grid item xs={ 12 } md={ 7 }>
                    <ListItemText primary={ title } secondary={ `Score: ${ score }` }/>
                </Grid>
                <Grid item xs={ 12 } md={ 3 }>
                    <ListItemText primary="Last taken" secondary={ since }/>
                </Grid>
                <Grid item xs={ 12 } md={ 2 }>
                    <ListItemText primary="Mode" secondary={ mode }/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Attempt