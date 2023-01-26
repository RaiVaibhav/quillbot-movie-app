import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Theme,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TvIcon from "@mui/icons-material/Tv";
import ListIcon from "@mui/icons-material/List";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import UpdateIcon from "@mui/icons-material/Update";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const ListOne = [
  {
    text: "Discover",
    url: "/discover",
    icon: <SearchIcon />,
  },
  {
    text: "Playlist",
    url: "/playlist",
    icon: <PlaylistPlayIcon />,
  },
  {
    text: "Movie",
    url: "/movie",
    icon: <LiveTvIcon />,
  },
  {
    text: "TV Shows",
    url: "/tvshows",
    icon: <TvIcon />,
  },
  {
    text: "My List",
    url: "/mylist",
    icon: <ListIcon />,
  },
];
const ListTwo = [
  {
    text: "Watch Later",
    url: "/watchlater",
    icon: <UpdateIcon />,
  },
  {
    text: "Recomended",
    url: "/recomended",
    icon: <FavoriteBorderIcon />,
  },
];

const ListThree = [
  {
    text: "Settings",
    url: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
  {
    text: "Logout",
    url: "/logout",
    icon: <LogoutIcon />,
  },
];

const navItems = [ListOne, ListTwo, ListThree];
const WrappedListItem = styled(ListItem)<{
  theme?: Theme;
  [key: string]: any;
  isSelected?: boolean;
}>(({ theme, isSelected }) => ({
  ...(isSelected && {
    "&:after": {
      content: "' '",
      height: "40px",
      width: "3px",
      backgroundColor: `${theme.custom.colorNavSelected}`,
    },
  }),
}));
export default function DrawerData() {
  const theme: Theme = useTheme();
  const router = useRouter();

  const ListItemWrapper = ({
    text,
    icon,
    url,
  }: {
    text: string;
    icon: React.ReactNode;
    url: string;
  }) => {
    const isSelected = url === router.pathname || url === router.asPath;
    return (
      <WrappedListItem
        key={text}
        disablePadding
        isSelected={isSelected}
        alignItems="center"
      >
        <Link
          href={url}
          passHref
          style={{
            color: "currentColor",
            width: "100%",
            textDecoration: "none",
          }}
        >
          <ListItemButton sx={{ paddingLeft: "52px" }}>
            <ListItemIcon
              sx={{
                color: isSelected ? theme.custom.colorNavSelected : "inherit",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 600,
                color: isSelected ? theme.custom.colorNavSelected : "inherit",
              }}
              primary={text}
            />
          </ListItemButton>
        </Link>
      </WrappedListItem>
    );
  };
  return (
    <Box sx={{ marginTop: "42px" }}>
      <Grid2 container spacing={0.727} minHeight={160}>
        <Grid2
          xs={16}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt="Eric Hoffman"
            src={
              "https://s3-alpha-sig.figma.com/img/29e5/f7bb/0ab57339bb6ce4ba4928448f183657ed?Expires=1675036800&Signature=pB6IchXm1Nfw1Um7U51p4qRTjMJxT53DjtYrRFlFnTSjw3hMJkUwUUGNjxKxsU7kh6hNP9z0bbZFThMY2EaMcXO-b4k3iBCh9fMk~cO1Yl8A~~rvyg2g2UFwll5ieIGo6I45ptcAqCio8mtdnDxTO~A~p1TnPZG3tEEcUkyQBokhNi~UwtSOj1Jkgt32CRxBlvEaNkTD0ogZwCnFCjfipBj~WR3N4Sv25z0OmYjoo3S0I-0550WhnF4BmUIL4-~KZy7gALmbrA8oEycNg1~aI0-L5p4Vvz5mKEYOkXK01L6A0tehVsouCNBVR9vJW6utzBSi3whawSZStX8fhfwcDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            sx={{ width: 91, height: 91 }}
          />
        </Grid2>
        <Grid2
          xs={16}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            Eric Hoffman
          </Typography>
        </Grid2>
      </Grid2>
      <Divider />
      {navItems.map((i, index) => {
        return (
          <>
            <List>
              {i.map((j) => {
                return <ListItemWrapper {...j} />;
              })}
            </List>
            {index !== navItems.length - 1 && <Divider />}
          </>
        );
      })}
    </Box>
  );
}
