import {alpha, createTheme, Theme, ThemeOptions} from "@mui/material";
import {blueGrey} from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    outline: {
      focus: string
    };
  }

  interface ThemeOptions {
    outline?: {
      focus?: string
    }
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#eceff1',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none"
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginLeft: "6px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none"
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    }
  }
};


let theme = createTheme(themeOptions);
theme.shadows[1] = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
theme.shadows[2] = "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
theme.shadows[5] = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
theme.shadows[10] = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
theme.shadows[15] = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
theme.shadows[20] = "0 25px 50px -12px rgb(0 0 0 / 0.25)";

theme = createTheme(theme, <ThemeOptions>{
  outline: {
    focus: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& th": {
            fontWeight: "bold"
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            '@media (hover: none)': {
              backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {

        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingBottom: theme.spacing(3),
          paddingLeft: theme.spacing(2)
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "64px",
          [theme.breakpoints.up("sm")]: {
            minHeight: "80px"
          }
        }
      }
    }
  }
})

export default theme;
