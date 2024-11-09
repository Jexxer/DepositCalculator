import { axiosInstance } from "@/Axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

export default function ResetPassword() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBtnDisabled(true);
    e.preventDefault();
    await axiosInstance
      .post(
        "/auth/reset-password",
        { email },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 200) {
          setEmailSent(true)
        }
      });
    setBtnDisabled(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {emailSent ?
            <>
              <Typography variant="h6">Please check your email for further instructions.</Typography>
            </>
            :
            <>
              <TextField

                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                disabled={btnDisabled}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Reset Password
              </Button>
            </>
          }
          <Grid container>
            <Grid item xs>
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" className="text-blue-500">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
