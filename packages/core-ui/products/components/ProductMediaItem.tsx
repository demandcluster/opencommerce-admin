import {ImageInfo} from "platform/types/gql-types";
import {Control} from "react-hook-form";
import React, {FC, useRef} from "react";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {Box, IconButton, ListItem} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ControlledTextField from "ui/ControlledTextField";
import config from "platform/config";
import DeleteIcon from "@mui/icons-material/Delete";
import {ProductMediaFieldValues} from "./ProductFormMedia";

type ProductMediaItemProps = {
  media: ImageInfo
  index: number
  control: Control<ProductMediaFieldValues>
  onDelete?: (id: string) => void
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

type DragItem = {
  media: ImageInfo
  index: number
}

const ProductMediaItem: FC<ProductMediaItemProps> = (
  {
    media,
    index,
    control,
    onDelete,
    moveItem
  }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{handlerId}, drop] = useDrop<DragItem,
    void,
    { handlerId: string | symbol | null }>({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveItem(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{isDragging}, drag] = useDrag({
    type: "item",
    item: () => {
      return {media, index}
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <ListItem
      component="li"
      sx={{display: "flex", gap: 2, py: 1, pr: 2}}
      disablePadding
      style={{opacity}}
      // @ts-ignore
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIndicatorIcon
        sx={{cursor: "grab"}}
      />
      <ControlledTextField
        control={control}
        name={`media.${index}.priority`}
        hideLabel={true}
        type="number"
        size="small"
        sx={{
          width: "10ch"
        }}
        fullWidth={false}
      />
      <Box
        flex={1}
      >
        <Box
          width="fit-content"
          height={{xs: "6rem", sm: "10rem"}}
          display="flex"
          borderRadius={1}
          overflow="hidden"
          component="img"
          src={`${config.VITE_PUBLIC_FILES_BASE_URL}${media.URLs.small}`}
          alt={media.productId}
        />
      </Box>
      <IconButton>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  )
};

export default ProductMediaItem;
