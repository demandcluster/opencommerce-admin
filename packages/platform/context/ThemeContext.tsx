import {createContext, FC, useCallback, useMemo, useState} from "react";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";

import {getTheme} from "../theme";
import {CssBaseline} from "@mui/material";

type State = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  theme: ReturnType<typeof getTheme>;
}

const ThemeModeKey = "themeMode";

export const ThemeContext = createContext<State>({} as State);

function getInitialThemeMode() {
  const storedThemeMode = localStorage.getItem(ThemeModeKey)
  if (storedThemeMode !== "light" && storedThemeMode !== "dark") {
    return "light";
  }
  return storedThemeMode;
}

export const ThemeProvider: FC = ({children}) => {
  const [mode, _setMode] = useState<State["mode"]>(getInitialThemeMode());
  const [theme, setTheme] = useState(getTheme(mode));

  const setMode = useCallback((mode: "light" | "dark") => {
    localStorage.setItem(ThemeModeKey, mode);
    _setMode(mode);
    document.documentElement.setAttribute(
      "data-color-scheme",
      mode
    );
    setTheme(getTheme(mode));
  }, []);

  const value = useMemo(() =>
    ({
      mode,
      setMode,
      theme
    }), [
    mode,
    setMode,
    theme
  ]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
