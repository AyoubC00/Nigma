import { Box, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Skeleton, Typography } from "@mui/material"
import Attempt from "../../components/Attempt/Attempt"
import { useQuizzes } from "../../contexts/QuizzesContext"
import { InfoRounded } from "@mui/icons-material"
import React from "react"

const Dashboard = () =>
{
    const { attempts, userQuizzes } = useQuizzes()
    const Placeholder = () =>
    {
        return (
            <ListItem secondaryAction={ <Skeleton variant="circular" width={ 40 } height={ 40 } sx={{ disply: "block" }} /> }>
                <Grid container>
                    <Grid item xs={ 12 } md={ 7 }>
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 400 }, mt: 1 }} />
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 400 }, mb: 1 }} />
                    </Grid>
                    <Grid item xs={ 12 } md={ 3 }>
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 100 }, mt: 1 }} />
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 100 }, mb: 1 }} />
                    </Grid>
                    <Grid item xs={ 12 } md={ 2 }>
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 100 }, mt: 1 }} />
                        <Skeleton variant="text" animation="wave" sx={{ width: { xs: 200, md: 100 }, mb: 1 }} />
                    </Grid>
                </Grid>
            </ListItem>
        )
    }
    return (
        <Container>
            <Box sx={{ px: { xs: 1, sm: 2 }, py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={ 4 }>
                        <Grid item xs={ 12 } sm={ 4 }>
                            <Paper sx={{ p: 1 }}>
                                <ListItem>
                                    <ListItemText primary="Attempts" secondary={ attempts === null ? <Skeleton variant="text" animation="wave" /> : attempts.length }/>
                                </ListItem>
                            </Paper>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 4 }>
                            <Paper sx={{ p: 1 }}>
                                <ListItem>
                                    <ListItemText primary="Quizzes" secondary={ userQuizzes === null ? <Skeleton variant="text" animation="wave" /> : userQuizzes.length }/>
                                </ListItem>
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={ 12 } sm={ 4 }>
                            <Paper sx={{ p: 1 }}>
                                <ListItem>
                                    <ListItemText primary="Quizzes" secondary={ 0 }/>
                                </ListItem>
                            </Paper>
                        </Grid> */}
                    </Grid>
                </Box>
                <Box>
                    <Typography variant="overline">Quiz attempts</Typography>
                    <Paper sx={{ px: 2, mt: 1 }}>
                        <List>
                            {
                                attempts === null ? <Placeholder /> : attempts.length === 0
                                ? <Typography variant="subtitle1" color="gray" sx={{ p: 4, textAlign: "center" }}>
                                    <InfoRounded sx={{ verticalAlign: "top" }}/> You haven't taken any quiz yet.
                                </Typography> 
                                : attempts.map((attempt, index) => 
                                    <React.Fragment key={ attempt.id } >
                                        <Attempt 
                                            id={ attempt.id }
                                            quiz_id={ attempt.quiz_id } 
                                            title={ attempt.title } 
                                            score={ attempt.score } 
                                            since={ attempt.since } 
                                            mode={ attempt.mode }
                                        />
                                        { index === attempts.length - 1 ? null : <Divider /> }
                                    </React.Fragment>
                                )
                            }
                        </List>
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
}

export default Dashboard