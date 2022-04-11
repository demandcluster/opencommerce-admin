import List from "@mui/material/List";
import {useTranslation} from "react-i18next";
import ListItemLink from "ui/ListItemLink";
import useOperatorRoutes from "../../hooks/useOperatorRoutes";
import {useResolvedPath} from "react-router-dom";
import {FC, memo, useRef} from "react";
import {useUI} from "../../hooks";

type SecondarySidebarProps = {
  groups: string[]
}

const SecondarySidebarMobile: FC<SecondarySidebarProps> = memo(({groups}) => {
  const {t} = useTranslation();
  const {pathname} = useResolvedPath("");
  const listRef = useRef<HTMLUListElement>(null);
  const operatorRoutesDefinitions = useOperatorRoutes({groups});

  const handleItemClick = (index: number) => {
    const listItem: HTMLElement = listRef.current?.children.item(index) as HTMLElement;
    listRef.current?.scrollTo({
      top: 0,
      left: listItem.offsetLeft - 16,
      behavior: 'smooth',
    })
  }

  return (
    <List
      ref={listRef}
      sx={{
        display: "flex",
        paddingX: 1,
        gap: 2,
        width: "100%",
        mb: 2,
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
          display: "none"
        },
        color: "text.primary",
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }}>
      {
        operatorRoutesDefinitions.map(({path, navigationLabel, NavigationIcon}, index) => (
          <ListItemLink
            sx={{width: "auto"}}
            to={pathname + '/' + path}
            key={path}
            textProps={{
              primary: t(navigationLabel || '')
            }}
            NavigationIcon={NavigationIcon}
            onClick={() => handleItemClick(index)}
          />
        ))
      }
    </List>
  );
})

const SecondarySidebar: FC<SecondarySidebarProps> = ({groups}) => {
  const {isMobile} = useUI();

  return <SecondarySidebarMobile groups={groups}/>;
}

export default SecondarySidebar;
