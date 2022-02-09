import {Product} from "platform/types/gql-types";
import {Row} from "react-table";

const MediaCell = ({ row }: {row: Row<Product>}) => {
  const thumbnailUrl = row.original && row.original.media && row.original.media[0]
    && row.original.media[0].URLs && row.original.media[0].URLs.thumbnail;

  if (!thumbnailUrl) {
    return (
      <img
        src={"/resources/placeholder.gif"}
        alt={row.values.title}
        width="36"
      />
    );
  }

  return (
    <img
      src={thumbnailUrl}
      alt={row.values.title}
      width="36"
    />
  );
}

export default MediaCell;
