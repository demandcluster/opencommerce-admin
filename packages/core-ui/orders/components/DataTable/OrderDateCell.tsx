import {FC} from "react";
import {Row} from "react-table";
import {Order} from "platform/types/gql-types";
import { DateTime } from "luxon";

type OrderDateCellProps = {
  row: Row<Order>
}

const OrderDateCell: FC<OrderDateCellProps> = ({ row }) => {
  const orderCreatedAt = DateTime.fromISO(row.values.createdAt);
  const duration = DateTime.now().diff(orderCreatedAt);
  const durationHours = duration.as("hours");

  let dateOrTime = orderCreatedAt.toFormat("f");

  if (durationHours < 1) {
    dateOrTime = orderCreatedAt.toRelative({unit: "minutes"})
    || `${duration.minutes} minutes ago`;
  }

  if (durationHours > 1 && durationHours < 8) {
    dateOrTime = orderCreatedAt.toRelative({unit: "hours"})
    || `${duration.hours} hours ago`;
  }

  return (
    <span style={{whiteSpace: "nowrap"}}>
      {dateOrTime}
    </span>
  );
}

export default OrderDateCell;
