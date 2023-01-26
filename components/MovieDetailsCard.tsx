import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Button, Grid, Slider, Theme, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { convertImage, toBase64 } from "../src/util";

const SlideWrapper = styled(Slider)<{ bColor: string }>`
  height: 8px;
  width: 111px;
  .MuiSlider-thumb {
    display: none;
  }
  .MuiSlider-rail {
    height: 8px;
    background-color: ${(props) => props.bColor};
  }
  .MuiSlider-track {
    border: none;
  }
`;

export default function MediaControlCard(props: any) {
  const theme: Theme = useTheme();
  const showImageBg = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "lg")
  );
  const ratingText = isNaN(props.imdbRating)
    ? "Not rated"
    : `${props.imdbRating}/10`;
  const ratingNo = !isNaN(parseInt(props.imdbRating))
    ? parseInt(props.imdbRating)
    : 0;
  return (
    <Grid container sx={{ display: "flex", height: "100%" }}>
      <Grid
        item
        xs={showImageBg ? 12 : 0}
        lg={3}
        xl={2}
        height={showImageBg ? "300px" : "100%"}
      >
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            alt={props.Poster}
            style={{
              borderTopLeftRadius: "11px",
              ...(showImageBg && { borderTopRightRadius: "11px" }),
              ...(!showImageBg && { borderBottomLeftRadius: "11px" }),
            }}
            src={showImageBg ? props.Images[0] : props.Poster}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(1000, 1000)
            )}`}
          />
        </Box>
      </Grid>
      <Grid item lg={9} xl={10}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" fontSize={30} fontWeight={700}>
              {props.Title}
            </Typography>
            <Box display="flex" alignItems="center">
              <SlideWrapper
                bColor={
                  theme.palette.mode === "dark"
                    ? theme.custom.color1A2536 || "inherit"
                    : theme.custom.colorNavSelected
                }
                // sx={{ bgcolor: theme.palette.primary.main}}
                size="medium"
                value={ratingNo}
                max={10}
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              &nbsp; &nbsp;
              <Typography
                fontSize={16}
                fontWeight={600}
                lineHeight={"31px"}
                sx={{ color: theme.custom.colorRating }}
              >
                {ratingText}
              </Typography>
            </Box>
            <Grid
              container
              gap={"8px"}
              paddingTop="12px"
              fontSize={"16px"}
              fontWeight={600}
            >
              <Grid container lg={8}>
                <Grid xs={4} md={5} lg={3} sx={{ p: 0 }}>
                  Year:
                </Grid>
                <Grid xs={8} md={7} lg={9} sx={{ p: 0 }}>
                  {props.Year}
                </Grid>
              </Grid>
              <Grid container lg={8}>
                <Grid xs={4} md={5} lg={3} sx={{ p: 0 }}>
                  Running Time:
                </Grid>
                <Grid xs={8} md={7} lg={9} sx={{ p: 0 }}>
                  {props.Runtime}
                </Grid>
              </Grid>
              <Grid container lg={8}>
                <Grid xs={4} md={5} lg={3} sx={{ p: 0 }}>
                  Directed By:
                </Grid>
                <Grid xs={8} md={7} lg={8} sx={{ p: 0 }}>
                  {props.Director}
                </Grid>
              </Grid>
              <Grid container lg={8}>
                <Grid xs={4} md={5} lg={3} sx={{ p: 0 }}>
                  language:
                </Grid>
                <Grid xs={8} md={7} lg={8} sx={{ p: 0 }}>
                  {props.Language}
                </Grid>
              </Grid>
            </Grid>
            <Box paddingTop={"20px"}>
              <Typography
                fontSize={14}
                sx={{ color: theme.custom.colorRating }}
              >
                {props.Plot}
              </Typography>
            </Box>
            <Grid container gap={2} marginTop={"21px"}>
              <Grid item>
                <Button
                  sx={{
                    borderRadius: "5px",
                    fontWeight: "700",
                    width: "154px",
                    fontSize: "16px",
                  }}
                  variant="contained"
                >
                  Play Movie
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    borderRadius: "5px",
                    fontWeight: "700",
                    width: "154px",
                    fontSize: "16px",
                  }}
                  variant="outlined"
                >
                  Outlined
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Grid>
    </Grid>
  );
}
