import {
  Link as RouterLink,
  LinkProps, To,
  useMatch,
  useResolvedPath
} from 'react-router-dom';
import {FC, forwardRef, MouseEventHandler, useMemo} from "react";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";

type ListItemLinkProps = {
  NavigationIcon?: FC;
  primary: string;
  onClick?: MouseEventHandler;
  to: To;
}

const ListItemLink: FC<ListItemLinkProps> = (
  { NavigationIcon,
    onClick,
    primary,
    to
  }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname});

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
      <ListItem
        selected={Boolean(match)}
        button
        component={renderLink}
        sx={{borderRadius: "6px"}}
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
  );
}

export default ListItemLink;