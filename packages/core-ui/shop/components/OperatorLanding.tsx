import React, {FC} from 'react';
import useShopId from "@platform/hooks/useShopId";
import {Account} from "../../../../types/gql-types";
import {Link, Navigate} from "react-router-dom";
import useAuth from "@platform/hooks/useAuth";
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

const OperatorLanding: FC = () => {
  const shopId = useShopId();
  const {viewer} = useAuth();

  const getShopIdFromViewer = (viewer: Account | null) => {
    return viewer?.adminUIShops?.find(shop => shop.shopType === "primary")?._id
      || viewer?.adminUIShops[0]?._id
  }

  if (!shopId) {
    const shopId = getShopIdFromViewer(viewer);
    return <Navigate to={`${shopId}`}/>
  }

  return (
    <>
      <Helmet title="Reaction Admin" />
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item />

        <Grid item>
          <Typography align="center" variant="body1">
            Use Demandcluster Admin to manage <Link to={`/${shopId}/orders`}>Orders</Link>,
            <Link to={`/${shopId}/products`}>Products</Link>,
            <Link to={`/${shopId}/tags`}>Tags</Link>,
            <Link to={`/${shopId}/accounts`}>Accounts</Link>,
            and <Link to={`/${shopId}/navigation`}>Navigation</Link>,
            or change shop settings.
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="body1">
            See our <MuiLink href="https://docs.reactioncommerce.com/docs/dashboard">Store Operator’s Guide</MuiLink> for more information.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default OperatorLanding;
