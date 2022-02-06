import React, {FC} from "react";
import moment from "moment";

type OrderDateCellProps = {
  row: {
    values:{
      createdAt: string
    }
  }
}

const OrderDateCell: FC<OrderDateCellProps> = ({ row }) => {
  // Determine what date or time to display.
  const now = moment();
  const orderCreatedAt = moment(row.values.createdAt);
  const duration = moment.duration(now.diff(orderCreatedAt));
  const durationHours = duration.asHours();

  let dateTimeFormat = "M/D [at] HH:mma";
  // Show year for orders placed outside the current year.
  if (orderCreatedAt.year() !== now.year()) {
    dateTimeFormat = "M/D/YYYY [at] HH:mma";
  }

  // Render order date by default
  let dateOrTime = moment(orderCreatedAt).format(dateTimeFormat);
  if (durationHours < 1) {
    dateOrTime = `${Math.round(duration.asMinutes())} minutes ago`;
  }

  if (durationHours > 1 && durationHours < 8) {
    dateOrTime = `${Math.round(durationHours)} hours ago`;
  }

  return (
    <span style={{whiteSpace: "nowrap"}}>
      {dateOrTime}
    </span>
  );
}

export default OrderDateCell;
