import { axiosInstance } from "@/Axios";
import { useAppDispatch } from "@/Redux/hooks";
import { loginSuccess } from "@/Redux/Slices/UserSlice";
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
import { useNavigate, Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post(
        "/login?useCookies=true",
        { email, password },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginSuccess());
          navigate("/");
        }
      });
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" className="text-blue-500">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" className="text-blue-500">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
