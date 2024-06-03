import { Person } from "@mui/icons-material"
import { Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"

interface ILeaderboardItem {
    name?: string
    score?: number
}

const LeaderboardItem = ({ name, score }: ILeaderboardItem) =>
{
    return (
        <ListItem sx={{ bgcolor: "rgba(255, 255, 255, .1)", mb: 1 }}>
            <ListItemAvatar><Person /></ListItemAvatar>
            <ListItemText 
                primary={
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: { xs: 12, sm: 16 } }}>{ name }</Typography>
                        <Typography sx={{ display: { xs: "none", sm: "block"} }}>{ score } Points</Typography>
                    </Box>
                }
                secondary={
                    <Typography sx={{ display: { xs: "block", sm: "none"}, fontSize: { xs: 12 } }}>{ score } Points</Typography>
                } 
            />
        </ListItem>
    )
}

export default LeaderboardItem