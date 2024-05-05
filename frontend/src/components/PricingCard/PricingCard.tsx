import { Check } from "@mui/icons-material"
import { Box, Button, SxProps, Typography } from "@mui/material"
import { blue, grey, orange } from "@mui/material/colors"

const PricingCard = ({ title, price, color, benifits = [] }: Tier) =>
{
    const _color = color === "blue" ? blue[700] : orange[700]
    const shadowColor = color === "blue" ? "#42dbff"  : "#ffe18e"
    const cardBgEffects: SxProps = {
        "&::before": {
            content: "''",
            position: "absolute",
            width: 0,
            height: 0,
            right: "50%",
            top: "50%",
            bottom: { xs: "25%" },
            translate: "-50% -50%",
            borderRadius: "100%",
            boxShadow: `0 0 400px 200px ${ shadowColor }`,
            zIndex: -2
        },
        "&::after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            bgcolor: "rgba(255, 255, 255, .4)",
            borderRadius: 2,
            backdropFilter: "blur('20px')",
            zIndex: -1,
        }
    }
    const cardStyle: SxProps = { 
        minWidth: 262, 
        minHeight: 400,
        position: "relative",
        color: "white",
        px: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 0 30px 1px ${ shadowColor }`,
        zIndex: 100,
    }
    const cardHeaderStyle: SxProps = {
        borderRadius: "0 0 100% 100%",
        bgcolor: _color,
        textAlign: "center",
        py: 3,
        boxShadow: 3,
        mb: 4,
    }
    return (
        <Box sx={ [cardBgEffects, cardStyle] }>
            <Box sx={ cardHeaderStyle }>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    { title }
                </Typography>
                <Typography variant="h4">
                    { price }
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {
                    benifits.map((benifit, index) =>
                        <Box key={ index } sx={{ color: grey[900], display: "flex", gap: 1, mb: 1.5 }}>
                            <Check />
                            <Typography variant="body2">{ benifit }</Typography>
                        </Box>
                    )
                }
                <Button 
                    fullWidth 
                    color={ color === "blue" ? "primary" : "secondary" }
                    variant="contained" 
                    sx={{ mt: "auto", mb: 4 }}>
                        Subscribe
                </Button>
            </Box>
        </Box>
    )
}

export default PricingCard