import { createTheme, responsiveFontSizes } from "@mui/material"
import { orange } from "@mui/material/colors"

declare module '@mui/material/styles' {
    interface TypographyVariants {
        heroTitle: React.CSSProperties;
        heroDescription: React.CSSProperties;
        sectionTitle: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        heroTitle?: React.CSSProperties;
        heroDescription?: React.CSSProperties;
        sectionTitle?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        heroTitle: true;
        heroDescription: true;
        sectionTitle: true;
    }
}

const theme = createTheme()

theme.palette.secondary = {
    main: orange[700],
    light: orange[500],
    dark: orange[800],
    contrastText: "#fff"
}

theme.typography.heroTitle = {
    display: "block",
    [theme.breakpoints.only("xs")]: {
        ...theme.typography.h5
    },
    [theme.breakpoints.only("sm")]: {
        ...theme.typography.h4
    },
    [theme.breakpoints.up("md")]: {
        ...theme.typography.h3
    },
    [theme.breakpoints.up("lg")]: {
        ...theme.typography.h2
    },
}

theme.typography.heroDescription = {
    display: "block",
    [theme.breakpoints.only("xs")]: {
        ...theme.typography.body1,
        display: "none",
    },
    [theme.breakpoints.up("md")]: {
        ...theme.typography.h6,
        disaply: "block",
    }
}

theme.typography.sectionTitle = {
    display: "block",
    [theme.breakpoints.down("sm")]: {
        ...theme.typography.h5
    },
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h4
    }
}

export default responsiveFontSizes(theme)