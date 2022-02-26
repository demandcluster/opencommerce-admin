import {FC} from "react";
import {Typography} from "@mui/material";

import {Address as AddressType} from "platform/types/gql-types";

const Address: FC<{ address: AddressType}> = ({address}) => {
  return (
    <>
      <Typography paragraph>
        {address.fullName}<br/>
        {address.address1}<br/>
        {address.city}, {address.region}<br/>
        {address.postal}<br/>
        {address.country}
      </Typography>
    </>
  )
}

export default Address;
