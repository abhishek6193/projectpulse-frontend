import * as React from "react";
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { useTheme } from "./context/theme-context";
import { lightTheme, darkTheme } from "./theme";

const CombinedThemeProvider = ({ children }) => {
  const { isDarkMode } = useTheme();

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StyledComponentsThemeProvider theme={theme}>
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default CombinedThemeProvider;
