import {FC} from "react";
import {Row} from "react-table";
import {Order} from "platform/types/gql-types";
import timeAgo from "../../helpers/timeAgo";

type OrderDateCellProps = {
  row: Row<Order>
}

const OrderDateCell: FC<OrderDateCellProps> = ({ row }) => {

  return (
    <span style={{whiteSpace: "nowrap"}}>
      {row.values.createdAt && timeAgo(row.values.createdAt)}
    </span>
  );
}

export default OrderDateCell;
