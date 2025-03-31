import React, {useState} from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../ccs_files/SignUpPage.css";
import Header from "./HomePageHeader";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data)
        throw new Error(data.detail || "Failed to sign up");
      }

      if (data.access && data.refresh) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }

      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");

      // ✅ Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="signup-page">
      <Header />
      <Container maxWidth="sm" className="signup-container">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Sign Up
        </Typography>

        <Paper elevation={3} className="signup-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{autoComplete: 'new-username'}}
                InputLabelProps={{shrink: Boolean(username)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{autoComplete: 'new-email'}}
                InputLabelProps={{shrink: Boolean(email)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{autoComplete: 'new-password'}}
                InputLabelProps={{shrink: Boolean(password)}}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignUp}
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <MuiAlert severity="error" onClose={() => setError(null)}>
              {error}
            </MuiAlert>
          </Snackbar>
        )}

        {success && (
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <MuiAlert severity="success" onClose={() => setSuccess(false)}>
              Sign-up successful! Redirecting to login...
            </MuiAlert>
          </Snackbar>
        )}

        <p>
          Already have an account?{" "}
          <button
            style={{
              color: "blue",
              background: "none",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "medium",
            }}
            onClick={handleRedirectToLogin}
          >
            Login
          </button>
        </p>
      </Container>
    </Box>
  );
};

export default SignUpPage;
