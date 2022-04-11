import {FC} from "react";
import {ListItemText, Menu as MuiMenu, MenuItem, MenuProps as MuiMenuProps} from "@mui/material";
import useUI from "../../hooks/useUI";

export type MenuItemProps = {
  key: string
  label: string
  details?: string
  confirmTitle?: string
  confirmMessage?: string
  onSelect?: () => any
}

type MenuProps = {
  actions: MenuItemProps[]
} & Omit<MuiMenuProps, "onSelect">

const Menu: FC<MenuProps> = (
  {
    actions,
    ...menuProps
  }) => {
  const {openDialog} = useUI();

  const handleClick = (action: MenuItemProps) => {
    if (action.confirmTitle) {
      return openDialog({
        title: action.confirmTitle,
        content: action.confirmMessage,
        onConfirm: () => action.onSelect && action.onSelect(),
        confirmTitle: "Agree"
      })
    }
    return action.onSelect && action.onSelect()
  }

  return (
    <MuiMenu
      id="import-actions-menu"
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      {...menuProps}
    >
      {
        actions.map((action) => (
          <MenuItem
            onClick={() => handleClick(action)}
            key={action.key}
          >
            <ListItemText
              primary={action.label}
              secondary={action.details && action.details}
            />
          </MenuItem>
        ))
      }
    </MuiMenu>
  )
}

export default Menu
