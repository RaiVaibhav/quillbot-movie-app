import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import SearchInput from "../components/SearchInput";
import DrawerData from "../components/DrawerData";

import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { createTheme, PaletteMode } from "@mui/material";
import getDesignTokens from "../src/theme";
import { useRouter } from "next/router";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dataMovies, { search } from "../src/data";
import { DarkMode } from "@mui/icons-material";

const drawerWidth = 275;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  window?: () => Window;
}

export default function ResponsiveDrawer(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { window } = props;
  const router = useRouter();
  const isDiscover = router.pathname === "/discover";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const [movies, setMovies] = React.useState(dataMovies);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const onSearch = (val: string) => {
    if (!val) {
      setMovies(dataMovies);
      return;
    }
    const data: any = search.search(val);
    setMovies(data);
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              boxShadow: "none",
              bgcolor: `${
                theme.palette.mode === "dark" ? "background.default" : "#fff"
              }`,
            }}
          >
            <Toolbar
              sx={{
                boxShadow: "none",
                paddingLeft: { sm: "42px !important" },
                paddingRight: { sm: "42px !important" },
                height: "100px",
                bgcolor: `${
                  theme.palette.mode === "dark"
                    ? "background.default"
                    : "background.paper"
                }`,
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                width={"100%"}
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
              >
                {isDiscover ? <SearchInput onSearch={onSearch} /> : <div></div>}
                <Box display="flex">
                  <IconButton onClick={colorMode.toggleColorMode}>
                    {mode === "dark" ? <LightModeIcon /> : <DarkMode />}
                  </IconButton>
                  &nbsp;
                  <IconButton sx={{ display: { xs: "none", lg: "flex" } }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              "& .MuiDrawer-paperAnchorLeft": {
                backgroundColor: theme.custom?.color1A2536 || "",
              },
            }}
            aria-label="navigation"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <DrawerData />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              <DrawerData />
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: "0px 48px 42px 48px",
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar sx={{ height: "120px" }} />
            <Component {...pageProps} moviesData={movies} />
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
