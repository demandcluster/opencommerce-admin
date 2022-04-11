import {lighten, darken, ThemeOptions} from "@mui/material/styles";

export const dark: ThemeOptions = {
  palette: {
    primary: {
      main: '#55a8cb',
      light: lighten('#55a8cb', 0.7),
      dark: darken('#55a8cb', 0.1),
    },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    success: {
      main: "#10b981"
    },
    info: {
      main: "#0ea5e9"
    },
    error: {
      main: "#ef4444"
    },
    warning: {
      main: "#eab308"
    },
    text: {
      primary: '#fff'
    },
  },
}

export const light: ThemeOptions = {
  palette: {
    primary: {
      main: '#0369a1',
      light: lighten('#0369a1', 0.1),
      dark: darken('#0369a1', 0.1),
    },
    success: {
      main: "#10b981"
    },
    background: {
      default: '#f3f4f6',
      paper: '#fff',
    },
    info: {
      main: "#0ea5e9"
    },
    error: {
      main: "#ef4444"
    },
    warning: {
      main: "#eab308"
    }
  }
}
