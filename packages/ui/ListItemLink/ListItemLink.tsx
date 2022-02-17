import {
  Link as RouterLink,
  LinkProps, To,
  useMatch,
  useResolvedPath
} from 'react-router-dom';
import {FC, forwardRef, MouseEventHandler, useMemo} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import {SxProps} from "@mui/material/styles";

type ListItemLinkProps = {
  NavigationIcon?: FC;
  primary: string;
  onClick?: MouseEventHandler;
  to: To;
  sx?: SxProps;
  hideTooltip?: boolean;
};

const ListItemLink: FC<ListItemLinkProps> = (
  {
    NavigationIcon,
    onClick,
    primary,
    to,
    sx,
    hideTooltip = true
  }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({path: resolved.pathname});

  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
        linkProps,
        ref,
      ) {
        return <RouterLink ref={ref} to={to}  {...linkProps} onClick={onClick}/>;
      }),
    [to],
  );

  return (
    <Tooltip
      title={primary}
      disableFocusListener={hideTooltip}
      disableHoverListener={hideTooltip}
      disableTouchListener={hideTooltip}
      placement="right"
    >
      <ListItem
        selected={Boolean(match)}
        button
        component={renderLink}
        sx={{
          ...sx,
          borderRadius: "6px"
        }}
      >
        {NavigationIcon && (
          <ListItemIcon>
            {<NavigationIcon/>}
          </ListItemIcon>
        )}
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            fontWeight: match ? 700 : 400
          }}
        />
      </ListItem>
    </Tooltip>
  );
}

export default ListItemLink;
