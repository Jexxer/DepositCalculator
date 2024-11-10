
import { axiosInstance } from "@/Axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function ResetPasswordConfirm() {
  const [searchParams] = useSearchParams()
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isProperLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumbers: false,
    hasSpecialChar: false,
  })
  const navigate = useNavigate();
  const COLORS = {
    error: "#f44336",
    success: "#66bb6a"
  }

  const validatePasswords = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    setPasswordValidation({
      isProperLength: password.length >= minLength,
      hasLowercase: hasLowerCase,
      hasUppercase: hasUpperCase,
      hasNumbers: hasNumber,
      hasSpecialChar: hasSpecialChar
    })

    const isValid = password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;

    if (isValid) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
    return isValid
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setBtnDisabled(true);
    e.preventDefault();
    await axiosInstance
      .post(
        "/auth/reset-password-confirm",
        {
          userId: searchParams.get("userId"),
          code: searchParams.get("code"),
          newPassword: password
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/login")
        }
      });
    setBtnDisabled(false);
  };

  useEffect(() => {
    validatePasswords()
  }, [password])

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              autoFocus
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              sx={{ backgroundColor: "white" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box sx={{ justifyItems: "center", mt: 1 }}>
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {passwordValidation.isProperLength
                  ? <FaCheck color={COLORS.success} />
                  : <FaXmark color={COLORS.error} />}
                <Typography>Minimum 8 characters</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {passwordValidation.hasUppercase
                  ? <FaCheck color={COLORS.success} />
                  : <FaXmark color={COLORS.error} />}
                <Typography>Contains uppercase</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {passwordValidation.hasLowercase
                  ? <FaCheck color={COLORS.success} />
                  : <FaXmark color={COLORS.error} />}
                <Typography>Contains lowercase</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {passwordValidation.hasNumbers
                  ? <FaCheck color={COLORS.success} />
                  : <FaXmark color={COLORS.error} />}
                <Typography>Contains numbers</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {passwordValidation.hasSpecialChar
                  ? <FaCheck color={COLORS.success} />
                  : <FaXmark color={COLORS.error} />}
                <Typography>Contains special characters</Typography>
              </Stack>
            </Stack>
          </Box>
          <Button
            disabled={btnDisabled}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Reset Password
          </Button>
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
