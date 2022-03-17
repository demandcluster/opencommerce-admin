import { FC, useState } from "react";
import { useLocation, useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../../hooks/useAuth";
import { ControlledTextField } from "ui";
import Layout from "./Layout";


const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const Login: FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState<Error | null>(null);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const from = (state as any)?.from?.pathname || '/';

  const onSubmit = async ({ email, password }: any) => {
    await login(email, password)
      .then(() => navigate(from, { replace: true }))
      .catch(setError);
  };

  if (isLoggedIn) {
    return (
      <Navigate to={"/"} />
    )
  }

  return (
    <Layout>
      <Container
          component="main"
          maxWidth="xs"
        >
          <Box
            sx={{
              mt: 8,
              py: 4,
              px: {
                xs: 2,
                sm: 4
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: "background.paper",
              borderRadius: 1,
              boxShadow: "10"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" pb={2}>
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              display="flex"
              flexDirection="column"
              gap={2}
              width="100%"
            >
              {error && <Alert severity="error" sx={{ width: "100%" }}>{error.message}</Alert>}
              <ControlledTextField
                control={control}
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
              />
              <ControlledTextField
                control={control}
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </Layout>
  );
}

export default Login;
