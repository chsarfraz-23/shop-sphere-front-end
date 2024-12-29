import React, { useState } from "react";
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
import "./SignUpPage.css";
import Header from "./HomePageHeader";
import {useNavigate} from "react-router-dom"; // Import the CSS file

const SignUpPage = () => {
  const [username, setUsername] = useState("Enter username");
  const [email, setEmail] = useState("Enter email");
  const [password, setPassword] = useState("Enter password");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

    const handleRedirectToLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }

      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
      <Box className="signup-page">
        <>
          <Header/>
        </>
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
                    InputLabelProps={{
                      shrink: true
                    }}
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
                  Sign-up successful! You can now log in.
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
                  fontSize: "medium"
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





