import { Box, Container, Typography } from "@mui/material"
import PricingCard from "../../components/PricingCard/PricingCard"
import { blue } from "@mui/material/colors"
import pricingCharacter from "../../assets/pointing_both_sides_right.png"

const Pricing = () =>
{
    const tiers:ITiers = {
        free: {
            title: "Quiz Dabbler",
            price: "Free",
            color: "blue",
            benifits: [
                "Take unlimited solo quizzes",
                "Create one solo quiz",
                "Join multiplayer quizzes",
            ]
        },
        paid: {
            title: "Quiz Master",
            price: "20 $",
            color: "orange",
            benifits: [
                "Take unlimited solo quizzes",
                "Create unlimited solo quizzes",
                "Create unlimited multiplayer quizzes",
                "Join multiplayer quizzes",
            ]
        }
    }

    return (
        <Box sx={{ bgcolor: blue[500] }}>
            <Container>
                <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 10 } }}>
                    <Typography variant="sectionTitle" color="white" sx={{ mb: 8 }}>
                        Choose the plan that suits you need
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: {xs: "center", sm: "space-between" },
                        flexWrap: { xs: "wrap", sm: "no-wrap" },
                        gap: { xs: 8, sm: 0 }
                    }}>
                        <PricingCard 
                            title={ tiers.free.title } 
                            price={ tiers.free.price } 
                            benifits={ tiers.free.benifits }
                            color={ tiers.free.color }
                        />
                        <Box sx={{ 
                            display: { xs: "none", md: "block" },
                            height: 400, 
                            alignSelf: "end" 
                        }}>
                            <img src={ pricingCharacter } alt="" style={{ height: "100%", translate: "0 80px" }} />
                        </Box>
                        <PricingCard 
                            title={ tiers.paid.title } 
                            price={ tiers.paid.price } 
                            benifits={ tiers.paid.benifits }
                            color={ tiers.paid.color }
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Pricing