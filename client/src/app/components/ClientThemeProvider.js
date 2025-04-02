"use client"
import { createTheme ,ThemeProvider} from "@mui/material";
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 560,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple:true,
 // Disable ripple effect for all buttons
          },
        },
      },
  });
  export default function ClientThemeProvider({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}