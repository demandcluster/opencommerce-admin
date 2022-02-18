import {MouseEvent, useState} from "react";

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    handleClose,
    handleClick,
    open
  }
}

export default useMenu;
