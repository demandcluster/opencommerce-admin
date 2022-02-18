import {FC} from "react";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton, {ListItemButtonProps} from "@mui/material/ListItemButton";

type ListItemAddProps = {
  primary: string;
} & ListItemButtonProps;

const ListItemAdd: FC<ListItemAddProps> = (
  {
    primary,
    sx,
    ...listItemProps
  }) => {
  return (
    <ListItemButton {...listItemProps} sx={{borderRadius: 1, ...sx}}>
      <AddIcon fontSize="small" sx={{mr: 1, color: "text.secondary"}}/>
      <ListItemText
        primary={primary}/>
    </ListItemButton>
  )
}

export default ListItemAdd;
