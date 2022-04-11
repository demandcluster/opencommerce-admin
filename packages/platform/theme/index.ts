import { alpha, createTheme, lighten, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

import type { } from '@mui/lab/themeAugmentation';
import {light, dark} from "./palette";

declare module '@mui/material/styles' {
  export interface TypeBackground {
    lighten: string
  }

  export interface Palette {
    gradient: {
      primary: string
    };
    outline: {
      focus: string
    };
  }

  export interface PaletteOptions {
    gradient?: {
      primary?: string
    };
    outline?: {
      focus?: string
    };
  }
}

export function getTheme(mode: "light" | "dark") {
  const themeModeOptions = mode === "light" ? light : dark;

  let theme = createTheme({
    palette: {
      mode,
    },
    shape: {
      borderRadius: 8,
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
            marginLeft: "6px",
            fontSize: "14px"
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "inherit"
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
  }, themeModeOptions);

  theme.shadows[1] = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  theme.shadows[2] = "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
  theme.shadows[5] = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
  theme.shadows[8] = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  theme.shadows[10] = "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  theme.shadows[15] = "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
  theme.shadows[20] = "0 25px 50px -12px rgb(0 0 0 / 0.25)";

  theme = createTheme(theme, <ThemeOptions>{
    palette: {
      outline: {
        focus: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
      },
      background: {
        lighten: lighten(theme.palette.background.default, 0.7)
      },
      gradient: {
        primary: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
      }
    }
  })

  theme = createTheme(theme, <ThemeOptions>{
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            overflow: "hidden"
          }
        }
      },
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
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px"
          },
          input: {
            padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`
          },
          inputSizeSmall: {
            padding: `${theme.spacing(1)} ${theme.spacing(1.25)}`
          },
          inputMultiline: {
            padding: 0
          },
          sizeSmall: {
            fontSize: "14px"
          }
        }
      },
      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true
        },
        styleOverrides: {
          root: {
            borderRadius: "8px",
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none"
            }
          },
          input: {
            padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`
          },
          inputSizeSmall: {
            padding: `${theme.spacing(1.125)} ${theme.spacing(1.75)}`
          },
          underline: {
            "&:before": {
              borderBottom: "none"
            },
            "&:after": {
              borderBottom: "none"
            }
          },
        }
      },
      MuiCard: {
        defaultProps: {
          elevation: 10
        },
        styleOverrides: {
          root: {
            borderRadius: "12px"
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
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            fontWeight: 700,
            textTransform: "none",
            paddingTop: theme.spacing(1.25),
            paddingBottom: theme.spacing(1.25),

          }
        }
      }
    }
  })

  return responsiveFontSizes(theme);
}
