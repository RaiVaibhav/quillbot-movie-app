import { Open_Sans } from "@next/font/google";
import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomTheme {
    custom?: {
      color1A2536?: string;
      colorNavSelected?: string;
      colorRating?: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export const opensans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#fff",
            paper: "#e3e3e3",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
          },
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        }
      : {
          background: {
            default: "#273244",
            paper: "#394B61",
          },
          primary: {
            main: "#00E0FF",
            light: '#3edada',
            dark: 'rgb(0, 156, 178)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          text: {
            primary: "#D4D7DD",
          },
        }),
  },
  custom: {
    ...(mode === "dark"
      ? {
          colorNavSelected: "#00E0FF",
          colorRating: '#fff',
          color1A2536: "#1A2536",
        }
      : { colorNavSelected: "#3f51b5", colorRating: 'inherit', }),
  },
  typography: {
    fontFamily: opensans.style.fontFamily,
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
});
export default getDesignTokens;
