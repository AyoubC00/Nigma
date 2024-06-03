import { List, ListSubheader } from "@mui/material"
import LeaderboardItem from "../components/LeaderboardItem/LeaderboardItem"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"
import { useQuizzes } from "../contexts/QuizzesContext"

const LeaderBoard = () =>
{
    const { user } = useAuth()
    return (
        <>
            <List>
                <ListSubheader disableGutters disableSticky sx={{ color: "white" }}>Leader board</ListSubheader>
                <LeaderboardItem name={ user?.username } score={ NaN }/>
            </List>
        </>
    )
}

export default LeaderBoard