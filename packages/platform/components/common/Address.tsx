import {FC} from "react";
import {SxProps, Typography} from "@mui/material";

import {Address as AddressType} from "../../types/gql-types";

const Address: FC<{ address?: AddressType, sx?: SxProps}> = ({address, sx}) => {
  return (
    <>
      <Typography paragraph sx={sx}>
        {address?.fullName}<br/>
        {address?.address1}<br/>
        {address?.city}, {address?.region}<br/>
        {address?.postal}<br/>
        {address?.country}
      </Typography>
    </>
  )
}

export default Address;
