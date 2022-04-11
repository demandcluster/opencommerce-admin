import InfiniteLoader from "react-window-infinite-loader";
import {FixedSizeList, ListChildComponentProps} from "react-window";
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {memo, useMemo} from "react";

type InfiniteListProps<T extends Object> = {
  loading?: boolean
  hasMoreItems: boolean
  areNextItemsLoading: boolean
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>
  listProps: object
  items: T[],
  getItemProps: (itemOptions: {
    item: T;
    index: number;
  }) => any
  getItemLabel: (item: T) => string
}

const InfiniteList = <T extends Object>(
  {
    hasMoreItems,
    areNextItemsLoading,
    loadMoreItems,
    listProps,
    items,
    getItemProps,
    getItemLabel
  }: InfiniteListProps<T>
) => {
  const itemCount = useMemo(() => hasMoreItems ? items.length + 1 : items.length, [hasMoreItems, items]);
  const isItemLoaded = (index: number) => !hasMoreItems || index < items.length;

  console.log("===========")
  console.log("[InfiniteList] rendered")
  console.log("===========")

  const Item = ({index, style}: ListChildComponentProps) => {
    if (!isItemLoaded(index)) {
      return (
        <ListItem component="li" style={style}>
          <ListItemText
            primaryTypographyProps={{color: "text.disabled"}}
            primary={"Loading..."}
          />
        </ListItem>
      )
    }

    const itemProps = getItemProps({item: items[index], index})
    const selected = itemProps && itemProps["aria-selected"];

    return (
      <ListItemButton
        component="li"
        selected={selected}
        {...itemProps}
        style={style}
      >
        <ListItemText
          primary={getItemLabel(items[index])}
        />
        {
          selected && <CloseIcon
            sx={{color: "text.secondary"}}
            fontSize="small"
          />
        }
      </ListItemButton>
    );
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={areNextItemsLoading ? () => {
      } : loadMoreItems}
    >
      {({onItemsRendered, ref}) => (
        <div {...listProps}>
          <FixedSizeList
            height={300}
            itemCount={itemCount}
            itemSize={46}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
          >
            {Item}
          </FixedSizeList>
        </div>
      )}
    </InfiniteLoader>
  )
}

export default memo(InfiniteList)
