import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";

const InputWrapper = styled(Paper)<{ theme?: Theme; isClicked: boolean }>(
  ({ theme, isClicked }) => ({
    boxShadow: "none",
    borderRadius: "8px",
    backgroundImage: theme?.palette.mode === "dark" ? "none" : "unset",
    backgroundColor: `${
      isClicked && theme?.palette.mode === "dark"
        ? theme?.custom?.color1A2536
        : theme?.palette.background.default
    }`,
    transition: `${theme?.transitions.create("width")}`,
    maxWidth: "576px",
    "& .MuiFormControl-root": {
      width: "100%",
    },
  })
);

const StyledInputBase = styled(InputBase)(({ theme }: { theme?: Theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme?.spacing(1, 1, 1, 0),
    boxShadow: "none",
    backgroundColor: "inherit",
    box: "none",
    width: "100%",
    transition: `${theme?.transitions.create("width")}`,
  },
  "& .MuiInputBase-inputAdornedEnd": {
    padding: "10px",
  },
}));

const EndAdornment = styled(IconButton)<{ theme?: Theme; visible: boolean }>(
  ({ theme, visible }) => ({
    opacity: `${visible ? "1" : "0"}`,
    transition: "opacity 0.5s 0.1s",
  })
);
export default function SearchInput({
  onSearch,
}: {
  onSearch: (val: string) => any;
}) {
  const [isClicked, setIsClicked] = React.useState(false);
  const [val, setVal] = React.useState("");
  const theme = useTheme();
  return (
    <InputWrapper
      //@ts-ignore
      component="form"
      isClicked={isClicked}
      sx={{
        display: "flex",
        alignItems: "center",
        width: isClicked ? "100%" : "0px",
      }}
      onSubmit={(e: any) => {
        e.preventDefault();
        onSearch(val);
      }}
    >
      <FormControlUnstyled>
        <StyledInputBase
          value={val}
          hidden={!isClicked}
          onChange={(e: any) => {
            const val = e.target.value;
            if (!val) {
              onSearch("");
            }
            setVal(val);
          }}
          startAdornment={
            <IconButton
              onClick={() => setIsClicked(!isClicked)}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          }
          endAdornment={
            <EndAdornment
              visible={isClicked}
              onClick={() => {
                setVal("");
                onSearch("");
              }}
              type="button"
              sx={{ p: "10px" }}
              aria-label="clear"
            >
              <ClearIcon />
            </EndAdornment>
          }
          id="filled-search"
          placeholder="Title, Movies, Keyword"
        />
      </FormControlUnstyled>
    </InputWrapper>
  );
}
