import { Box } from "@mui/material";
import config from "platform/config";
import {Product} from "platform/types/gql-types";
import {Row} from "react-table";

const MediaCell = ({ row }: {row: Row<Product>}) => {
  const thumbnailUrl = row.original?.media[0]?.URLs.thumbnail ? (
    `${config.VITE_PUBLIC_FILES_BASE_URL}${row.original?.media[0]?.URLs.thumbnail}`
  ) : "/placeholder.png";
  
  return (
    <Box
    width="2.5rem"
    height="2.5rem"
    display="flex"
    >
      <img
      src={thumbnailUrl}
      alt={row.values.title}
    />
    </Box>
  );
}

export default MediaCell;
