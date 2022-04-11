import {FC} from "react";
import MuiAvatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import {useAuth, useTheme} from "../../hooks";
import {useMenu} from "ui/hooks";
import {Theme} from "@mui/material/styles";

const Avatar: FC = () => {
  const {open, handleClick, handleClose, anchorEl} = useMenu();
  const {setMode, mode} = useTheme();
  const {logout} = useAuth();

  const handleThemeMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          sx={{
            p: 0,
            "&:hover, &:focus": {
              boxShadow: (theme: Theme) => theme.palette.outline.focus,
            },
          }}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
            <MuiAvatar><PersonIcon/></MuiAvatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={() => {
          handleClose()
          return logout()
        }}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={handleThemeMode}>
          <ListItemIcon>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          Mode
        </MenuItem>
      </Menu>
    </>
  )
}

export default Avatar;
