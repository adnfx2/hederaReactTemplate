import { useMemo } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const darkPalette = {
  palette: { type: "dark" },
};

const DarkThemeProvider = ({ children }) => {
  const darkTheme = useMemo(() => createMuiTheme(darkPalette), []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default DarkThemeProvider;
