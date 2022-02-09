import {FC, MouseEvent, useState} from "react";
import MuiAvatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import useAuth from "../../hooks/useAuth";
import {useMenu} from "ui/hooks";
import {alpha} from "@mui/material";
import theme from "../../theme";

const Avatar: FC = () => {
  const {open, handleClick, handleClose, anchorEl} = useMenu();
  const {viewer, logout} = useAuth();

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          sx={{
            p: 0,
            "&:active": {
              backgroundColor: alpha(theme.palette.primary.light, theme.palette.action.selectedOpacity),
            },
            "&:hover": {
              boxShadow: theme.outline.focus
            },
            "&:focus": {
              boxShadow: theme.outline.focus
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
        onClick={handleClose}
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
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default Avatar;
