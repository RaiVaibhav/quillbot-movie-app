import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Theme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useWidth } from "../src/hooks/useWidth";
import styled from "@emotion/styled";
import MediaControlCard from "../components/MovieDetailsCard";

const WrappedListItem = styled(Card)<{
  [key: string]: any;
  isSelected?: boolean;
  theme?: Theme;
}>(({ theme }) => ({
  "&:before": {
    content: "' '",
    height: "40px",
    width: "3px",
    backgroundColor: `${theme.custom?.colorNavSelected}`,
  },
}));

const WrappedAnimation = styled(Box)<{ showItem: boolean; height: string }>`
  height: ${(props) => (props.showItem ? props.height : "0px")};
  opacity: ${(props) => (props.showItem ? "1" : "0")};
  transition: height 0.6s, opacity 0.4s 0.1s;
  display: flex;
  width: 100%;
  align-items: center;
`;
const WrappedAnimationChild = styled(Box)<{ theme?: Theme; showItem: boolean }>(
  ({ theme, showItem }) => ({
    display: "flex",
    height: `${showItem ? "100%" : "0px"}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "11px",
    width: "100%",
    opacity: `${showItem ? "1" : "0"}`,
    transition: "height 0.4s 0.2s",
  })
);

const AnimatedMovieDetail = styled(Box)<{ showItem: boolean }>`
  opacity: ${(props) => (props.showItem ? "1" : "0")};
  transition: opacity 0.5s 0.5s;
  width: 100%;
`;
const MovieCard = ({
  Title,
  Poster,
  onClick,
  selected = false,
}: {
  Title: string;
  Poster: string;
  onClick: () => any;
  selected: boolean
}) => {
  return (
    <WrappedListItem
      sx={{ maxWidth: 178, borderRadius: "11px" }}
      onClick={() => onClick()}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "column", borderRadius: '11px', border: selected ? '3px solid #00E0FF' : '' }}>
        <CardContent sx={{ width: "100%", p: 0, display: "contents" }}>
          <Grid2 container spacing={1}>
            <Grid2 xs={16}>
              <Image
                alt={Poster}
                style={{ borderRadius: "11px" }}
                src={Poster}
                height={188}
                width={157}
              />
            </Grid2>
            <Grid2 xs={16}>
              <Typography fontWeight={600}>{Title}</Typography>
            </Grid2>
            <Grid2 xs={16}>
              <Box>
                <PlayCircleOutlineIcon />
                &nbsp;&nbsp;
                <AddCircleOutlineIcon />
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </CardActionArea>
    </WrappedListItem>
  );
};

export interface Movie {
  Title: string;
  Year: string;
  imdbRating: string;
  Images: string[];
  Runtime: string;
  Director: string;
  Language: string;
  Plot: string;
  imdbID: string
}

export interface SelectedMovie {
  movie: Movie;
  row: number;
  index: number;
}
export default function ActionAreaCard({ moviesData }: { moviesData: any[] }) {
  const showImageBg = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "lg")
  );
  const column = useWidth();
  const row = Math.ceil(moviesData.length / column);
  const [selectedMovie, setSelectedMovie] = React.useState<SelectedMovie>();

  const onMovieSelect = (row: number, index: number) => {
    const clickedMovie: Movie =
      moviesData[row === 0 ? index : row * column + index];
    setSelectedMovie({
      row,
      index,
      movie: clickedMovie,
    });
  };

  return (
    <Box>
      {moviesData.length === 0 && (
        <Typography fontWeight={600} fontSize={"21px"}>
          No results found for your search.
        </Typography>
      )}
      <Grid2 container spacing={4} alignItems="center">
        {Array.from({ length: row }, (v, i) => i).map((i: number) => {
          const movies = moviesData.slice(i * column, column * (i + 1));
          const showItem =
            selectedMovie &&
            selectedMovie["row"] !== undefined &&
            selectedMovie["row"] === i;
          return (
            <>
              <WrappedAnimation
                height={
                  showImageBg ? (column === 1 ? "850px" : "700px") : "389px"
                }
                showItem={!!showItem}
              >
                <WrappedAnimationChild showItem={!!showItem}>
                  <AnimatedMovieDetail showItem={!!showItem}>
                    {selectedMovie && (
                      <MediaControlCard {...selectedMovie?.movie} />
                    )}
                  </AnimatedMovieDetail>
                </WrappedAnimationChild>
              </WrappedAnimation>

              <Grid2
                key={`movie-${i}-row`}
                container
                xs={16}
                justifyContent={
                  movies.length < column
                    ? ""
                    : movies.length === 1
                    ? "center"
                    : "space-between"
                }
              >
                {movies.map((movie, j) => {
                  return (
                    <Grid2 xs={16 / column} sx={{ width: "fit-content" }}>
                      <MovieCard
                        key={movie.imdbID}
                        {...movie}
                        onClick={() => onMovieSelect(i, j)}
                        selected={
                          selectedMovie &&
                          selectedMovie.movie.imdbID === movie.imdbID
                        }
                      />
                    </Grid2>
                  );
                })}
              </Grid2>
            </>
          );
        })}
      </Grid2>
    </Box>
  );
}
