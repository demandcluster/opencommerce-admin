import {
  Link as RouterLink,
  LinkProps, matchPath, To,
  useLocation,
  useResolvedPath
} from 'react-router-dom';
import {FC, forwardRef, MouseEventHandler, ReactNode, useMemo} from "react";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from '@mui/material/ListItemButton';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box, IconButton} from "@mui/material";

export type ListItemLinkProps = {
  NavigationIcon?: FC;
  onClick?: MouseEventHandler;
  to: To;
  tooltipTitle?: string;
  hideTooltip?: boolean;
  textProps?: ListItemTextProps;
  matchPathEnd?: boolean;
  primaryAction?: ReactNode;
} & Omit<ListItemProps, "selected" | "component" | "button">;

const ListItemLink: FC<ListItemLinkProps> = (
  {
    NavigationIcon,
    onClick,
    to,
    hideTooltip = true,
    tooltipTitle = "",
    textProps,
    matchPathEnd = false,
    primaryAction,
    ...listItemProps
  }) => {
  const resolved = useResolvedPath(to);
  const location = useLocation();
  const match = useMemo(() => matchPath(
    {
      path: resolved.pathname,
      end: matchPathEnd
    },
    location.pathname
  ), [location]);

  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
        linkProps,
        ref,
      ) {
        return <RouterLink ref={ref} to={to}  {...linkProps} onClick={onClick} />;
      }),
    [to],
  );

  return (
    <Tooltip
      title={tooltipTitle}
      disableFocusListener={hideTooltip}
      disableHoverListener={hideTooltip}
      disableTouchListener={hideTooltip}
      placement="right"
    >
      <ListItem
      disablePadding
        {...listItemProps}
      >
        <ListItemButton
          selected={Boolean(match)}
          component={renderLink}
          sx={{
            ...(primaryAction && {
              pl: 6
            })
          }}
        >
          {NavigationIcon && (
            <ListItemIcon>
              {<NavigationIcon />}
            </ListItemIcon>
          )}
          <ListItemText
            {...textProps}
            primaryTypographyProps={{
              fontWeight: match ? 700 : 400,
              ...textProps?.primaryTypographyProps
            }}
          />
        </ListItemButton>
        {primaryAction && (
          <Box sx={{
            position: "absolute",
            top: "50%",
            pl: 1,
            transform: "translateY(-50%)"
          }}>
            {primaryAction}
          </Box>
        )}
      </ListItem>
    </Tooltip>
  );
}

export default ListItemLink;
