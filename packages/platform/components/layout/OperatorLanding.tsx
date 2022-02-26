import {FC} from 'react';
import {Link} from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

const OperatorLanding: FC = () => {
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
            Use Demandcluster Admin to manage <Link to={`/orders`}>Orders</Link>,
            <Link to={`/products`}>Products</Link>,
            <Link to={`/tags`}>Tags</Link>,
            <Link to={`/accounts`}>Accounts</Link>,
            and <Link to={`/navigation`}>Navigation</Link>,
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
