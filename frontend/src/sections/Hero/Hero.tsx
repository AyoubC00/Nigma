import { Box, Button, Container, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import bgImage from "../../assets/Sprinkle.svg"
import heroCharacter from "../../assets/left_character_smiling.png"

const Hero = () =>
{
    const HeroStyle = {
        color: "white",
        bgcolor: blue[500],
        backgroundImage: `url(${bgImage})`,
        height: { xs: "auto", sm: "calc(100svh - 64px)", md: "auto" },
    }
    return (
        <Box sx={ HeroStyle }>
            <Container sx={{ display: { xs: "block", md: "flex", gap: 8 } }}>
                <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 8 } }}>
                    <Typography variant="heroTitle" sx={{
                        mb: { xs: 4, xl: 8 }
                    }}>Challenge Yourself & Others on Nigma</Typography>
                    <Typography variant="heroDescription" sx={{
                        mb: 4
                    }}>
                        Unleash your inner quiz master on Nigma!  
                        This interactive platform lets you create and share your own quizzes on any topic,
                        or dive into a world of engaging challenges from others. 
                    </Typography>
                    <Typography variant="body1" sx={{
                        mb: 6
                    }}>Test your knowledge, learn new things, and compete with friends – it's the ultimate quiz arena!</Typography>
                    <Box sx={{
                        display: { xs: "flex" },
                        flexDirection: { xs: "column", sm: "row"},
                        gap: 4,
                    }}>
                        <Button variant="contained" size="large">Take a quiz</Button>
                        <Button variant="contained" size="large" color="secondary">Make a quiz</Button>
                    </Box>
                </Box>
                <Box sx={{ height: 450, mt: "auto", display: { xs: "none", md: "block"} }}>
                    <img src={ heroCharacter } alt="Character" style={{ height: "100%", display: "block" }} />
                </Box>
            </Container>
        </Box>
    )
}

export default Hero