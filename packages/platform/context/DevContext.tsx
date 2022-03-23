import {createContext, FC, useEffect, useState} from "react"
import {Box, ButtonBase, Collapse, List, ListItem, ListItemButton, Tooltip, Typography, Theme} from "@mui/material";
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import useAuth from "../hooks/useAuth";
import useShop from "../hooks/useShop";

interface State {
}

export const DevContext = createContext({} as State)

export const DevProvider: FC = ({children}) => {
  const {viewer} = useAuth();
  const {currentShop} = useShop();
  // @ts-ignore
  const [isDev] = useState(import.meta.env.DEV)
  const [expanded, setExpanded] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("accounts:accessToken"));
  const [authTokenCopied, setAuthTokenCopied] = useState(false);
  const [shopCopied, setShopCopied] = useState(false);

  useEffect(() => {
    setAuthToken(localStorage?.getItem("accounts:accessToken"))
  }, [viewer]);


  const handleCopyAuthToken = async () => {
    if (!authToken) return
    await navigator.clipboard.writeText(authToken);
    setAuthTokenCopied(true)
    setTimeout(() => {
      setAuthTokenCopied(false)
    }, 1000)
  }

  const handleCopyShopId = async () => {
    if (!currentShop) return
    await navigator.clipboard.writeText(currentShop._id);
    setShopCopied(true)
    setTimeout(() => {
      setShopCopied(false)
    }, 1000)
  }

  return (
    <>
      {children}
      {isDev && (
        <Box
          position="absolute"
          bottom={0}
          right="2rem"
          display="flex"
          flexDirection="column"
          alignItems="end"
        >
          <ButtonBase
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: "fit-content",
              p: 1,
              borderRadius: "6px 6px 0 0",
              bgcolor: (theme: Theme) => theme.palette.background.paper
            }}>
            Devtools
            <KeyboardDoubleArrowUpRoundedIcon
              fontSize="small"
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0)"
              }}
            />
          </ButtonBase>
          <Collapse in={expanded}>
            <Box
              bgcolor="background.paper"
              borderRadius="6px 0 0 0"
              maxWidth="350px"
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleCopyAuthToken}
                    sx={{gap: 1, width: "100%"}}
                  >
                    <Typography
                      noWrap
                      fontWeight="bold"
                      fontSize="12px"
                      overflow="visible"
                    >
                      Access Token:
                    </Typography>
                    {authToken &&
                      <Typography
                        noWrap
                        fontSize="12px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {authToken}
                      </Typography>}
                    {!authToken &&
                      <Typography
                        fontSize="12px"
                        color="text.secondary"
                      >
                        <em>null</em>
                      </Typography>
                    }
                    <Tooltip
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      placement="right"
                      open={authTokenCopied} title={"Copied!"}
                    >
                      <ContentCopyRoundedIcon fontSize="small"/>
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleCopyShopId}
                    sx={{gap: 1, width: "100%"}}
                  >
                    <Typography
                      noWrap
                      fontWeight="bold"
                      fontSize="12px"
                      overflow="visible"
                    >
                      Shop ID:
                    </Typography>
                    {currentShop &&
                      <Typography
                        fontSize="12px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {currentShop._id}
                      </Typography>}
                    {!currentShop &&
                      <Typography
                        fontSize="12px"
                        color="text.secondary"
                      >
                        <em>null</em>
                      </Typography>
                    }
                    <Tooltip
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      open={shopCopied}
                      placement="right"
                      title="Copied!">
                      <ContentCopyRoundedIcon fontSize="small"/>
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Collapse>
        </Box>
      )}
    </>
  );
}

export default DevProvider;
