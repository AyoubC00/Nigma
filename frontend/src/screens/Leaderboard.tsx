import { List, ListSubheader } from "@mui/material"
import LeaderboardItem from "../components/LeaderboardItem/LeaderboardItem"

const LeaderBoard = () =>
{
    return (
        <>
            <List>
                <ListSubheader disableGutters disableSticky sx={{ color: "white" }}>Leader board</ListSubheader>
                <LeaderboardItem name="Ayoub Chouker" score={ 1000 }/>
                <LeaderboardItem name="Ayoub Chouker" score={ 1000 }/>
                <LeaderboardItem name="Ayoub Chouker" score={ 1000 }/>
            </List>
        </>
    )
}

export default LeaderBoard